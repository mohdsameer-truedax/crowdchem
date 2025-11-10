#!/usr/bin/env python3
"""
Script to update all rem-based size properties in TSX files to follow responsive pattern:
- xl: 2xl * 0.8333 (16.67% less than 2xl)
- lg: 2xl * 0.76 (24% less than 2xl)
- md: 2xl * 0.6667 (33.33% less than 2xl)
- base: same as md
"""

import re
import os
from pathlib import Path
from decimal import Decimal, ROUND_HALF_UP

def calculate_responsive_sizes(size_2xl):
    """Calculate responsive sizes based on 2xl value"""
    size_2xl = Decimal(str(size_2xl))

    # Calculate sizes with 4 decimal places
    xl = (size_2xl * Decimal('0.8333')).quantize(Decimal('0.0001'), rounding=ROUND_HALF_UP)
    lg = (size_2xl * Decimal('0.76')).quantize(Decimal('0.0001'), rounding=ROUND_HALF_UP)
    md = (size_2xl * Decimal('0.6667')).quantize(Decimal('0.0001'), rounding=ROUND_HALF_UP)

    return {
        'md': str(md),
        'lg': str(lg),
        'xl': str(xl),
        '2xl': str(size_2xl)
    }

def extract_rem_value(text):
    """Extract rem value from text like '1.875rem' or '[1.875rem]'"""
    match = re.search(r'(\d+\.?\d*)rem', text)
    if match:
        return float(match.group(1))
    return None

def update_file_content(content):
    """Update all rem-based properties in the file content"""

    # Pattern to find classes with 2xl: and rem values
    # This matches patterns like: 2xl:text-[1.875rem] or 2xl:h-[47rem] or 2xl:w-[75rem]
    pattern_2xl = r'(2xl:(?:text|h|w|p|m|pt|pb|pl|pr|px|py|mt|mb|ml|mr|mx|my|gap|rounded|leading|tracking|space-x|space-y|max-w|max-h|min-w|min-h)-\[)([\d.]+)(rem\])'

    # Find all 2xl rem values
    matches = list(re.finditer(pattern_2xl, content))

    replacements = []

    for match in matches:
        prefix = match.group(1)
        size_2xl = float(match.group(2))
        suffix = match.group(3)

        # Calculate responsive sizes
        sizes = calculate_responsive_sizes(size_2xl)

        # Extract the property type (text, h, w, etc.)
        prop_match = re.search(r'2xl:([\w-]+)-\[', prefix)
        if not prop_match:
            continue

        prop_type = prop_match.group(1)

        # Build the full responsive class string
        # Look for existing md:, lg:, xl: before this 2xl:
        # We need to find the context around this match
        start_pos = max(0, match.start() - 200)
        end_pos = min(len(content), match.end() + 50)
        context = content[start_pos:end_pos]

        # Check if there are already md/lg/xl values for this property
        existing_md = re.search(rf'md:{prop_type}-\[([\d.]+)rem\]', context)
        existing_lg = re.search(rf'lg:{prop_type}-\[([\d.]+)rem\]', context)
        existing_xl = re.search(rf'xl:{prop_type}-\[([\d.]+)rem\]', context)

        # If they exist and are close to our calculated values, update them
        # Otherwise, insert new ones

        replacements.append({
            'original': match.group(0),
            'start': match.start(),
            'end': match.end(),
            'sizes': sizes,
            'prop_type': prop_type,
            'has_existing': {
                'md': existing_md is not None,
                'lg': existing_lg is not None,
                'xl': existing_xl is not None
            }
        })

    # Process replacements in reverse order to maintain positions
    replacements.reverse()

    for repl in replacements:
        prop_type = repl['prop_type']
        sizes = repl['sizes']
        start = repl['start']
        end = repl['end']

        # Find the full className string containing this property
        # Look backwards to find the start of className
        class_start = content.rfind('className="', max(0, start - 500), start)
        if class_start == -1:
            continue
        class_start += len('className="')

        # Look forward to find the end
        class_end = content.find('"', end, end + 100)
        if class_end == -1:
            continue

        # Extract the full className
        full_class = content[class_start:class_end]

        # Now intelligently update or insert the responsive classes
        updated_class = full_class

        # Update/insert md
        md_pattern = rf'md:{prop_type}-\[([\d.]+)rem\]'
        md_replacement = f'md:{prop_type}-[{sizes["md"]}rem]'
        if re.search(md_pattern, updated_class):
            updated_class = re.sub(md_pattern, md_replacement, updated_class)
        else:
            # Insert before lg or xl or 2xl
            insert_before = rf'(lg:{prop_type}-|xl:{prop_type}-|2xl:{prop_type}-)'
            if re.search(insert_before, updated_class):
                updated_class = re.sub(insert_before, f'{md_replacement} \\1', updated_class, count=1)

        # Update/insert lg
        lg_pattern = rf'lg:{prop_type}-\[([\d.]+)rem\]'
        lg_replacement = f'lg:{prop_type}-[{sizes["lg"]}rem]'
        if re.search(lg_pattern, updated_class):
            updated_class = re.sub(lg_pattern, lg_replacement, updated_class)
        else:
            # Insert before xl or 2xl
            insert_before = rf'(xl:{prop_type}-|2xl:{prop_type}-)'
            if re.search(insert_before, updated_class):
                updated_class = re.sub(insert_before, f'{lg_replacement} \\1', updated_class, count=1)

        # Update/insert xl
        xl_pattern = rf'xl:{prop_type}-\[([\d.]+)rem\]'
        xl_replacement = f'xl:{prop_type}-[{sizes["xl"]}rem]'
        if re.search(xl_pattern, updated_class):
            updated_class = re.sub(xl_pattern, xl_replacement, updated_class)
        else:
            # Insert before 2xl
            insert_before = rf'(2xl:{prop_type}-)'
            if re.search(insert_before, updated_class):
                updated_class = re.sub(insert_before, f'{xl_replacement} \\1', updated_class, count=1)

        # Replace in content
        content = content[:class_start] + updated_class + content[class_end:]

    return content

def process_tsx_files(directory):
    """Process all TSX files in the directory"""
    src_path = Path(directory)
    tsx_files = list(src_path.rglob('*.tsx'))

    stats = {
        'total_files': len(tsx_files),
        'modified_files': 0,
        'total_replacements': 0
    }

    for tsx_file in tsx_files:
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                original_content = f.read()

            # Update content
            updated_content = update_file_content(original_content)

            # Only write if content changed
            if updated_content != original_content:
                with open(tsx_file, 'w', encoding='utf-8') as f:
                    f.write(updated_content)

                stats['modified_files'] += 1

                # Count replacements
                replacements = len(re.findall(r'2xl:(?:text|h|w|p|m|pt|pb|pl|pr|px|py|mt|mb|ml|mr|mx|my|gap|rounded|leading|tracking)-\[[\d.]+rem\]', updated_content))
                stats['total_replacements'] += replacements

                print(f"✓ Updated: {tsx_file.relative_to(src_path)}")
        except Exception as e:
            print(f"✗ Error processing {tsx_file}: {e}")

    return stats

if __name__ == '__main__':
    src_directory = 'c:/Users/mohdsameer/Desktop/crowdchem/crowdchem/src'

    print("Starting rem size updates...")
    print(f"Processing directory: {src_directory}\n")

    stats = process_tsx_files(src_directory)

    print(f"\n{'='*60}")
    print(f"Update Complete!")
    print(f"{'='*60}")
    print(f"Total files scanned: {stats['total_files']}")
    print(f"Files modified: {stats['modified_files']}")
    print(f"Total 2xl properties found: {stats['total_replacements']}")
    print(f"{'='*60}")
