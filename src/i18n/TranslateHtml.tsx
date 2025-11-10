// src/i18n/TranslateHtml.tsx (New File)
import React from 'react';
import { useTranslation } from './useTranslation';

interface TranslateHtmlProps {
  i18nKey: string;
  // This expects an object where keys like '1' map to the desired component/element
  components: Record<string | number, React.ReactElement>;
}

/**
 * Custom component to handle i18n interpolation (like Trans in react-i18next).
 * It fetches the translated string and replaces markers (e.g., <1>...</1>) 
 * with the corresponding React component provided in the 'components' prop.
 */
export const TranslateHtml: React.FC<TranslateHtmlProps> = ({ i18nKey, components }) => {
  const { t } = useTranslation();
  const rawText = t(i18nKey);

  // Split the raw translated text by the markers <1> and </1>
  // Note: This relies on the translation files having EXACTLY <1> and </1> markers.
  const parts = rawText.split(/(<[0-9]+>|<\/[0-9]+>)/g).filter(Boolean);

  const renderedElements: React.ReactNode[] = [];
  let componentIndex = 0;

  parts.forEach((part, index) => {
    // Check if the part is a starting marker (e.g., <1>)
    if (part.match(/<([0-9]+)>/)) {
      const key = part.replace(/[<>]/g, '');
      const Component = components[key];

      if (Component) {
        // Find the matching closing tag's content
        let content = '';
        const closingTagIndex = parts.findIndex((p, i) => i > index && p === `</${key}>`);
        
        if (closingTagIndex !== -1) {
            content = parts.slice(index + 1, closingTagIndex).join('');
        }

        // Render the component with the content as children, assigning a unique key
        renderedElements.push(
            React.cloneElement(Component, { key: `i18n-${key}-${componentIndex++}` }, content)
        );
        
        // Skip parts until the closing tag (handled by the .split/.join above)
        // Note: A simpler split implementation just relies on the marker positions:
        
        // Simple but less robust logic: assumes part at parts[index+1] is content
        // renderedElements.push(React.cloneElement(Component, { key: `i18n-${key}-${index}` }, parts[index + 1]));
        
      // For this specific simple bolding case, we can use a simpler split logic:
    } else if (key === '1' && components[1]) {
         const Component = components[1];
         // Logic relies on simple split: Content is the next item in the array
         if (parts[index + 1] && parts[index+2] === '</1>') {
             renderedElements.push(
                 React.cloneElement(Component, { key: `i18n-1-${index}` }, parts[index + 1])
             );
         }
    }
    
    // Check if the part is a closing marker (e.g., </1>)-skip it as content was already handled
    } else if (part.match(/<\/[0-9]+>/)) {
        // Skip
    } else if (parts[index - 1] && parts[index - 1].match(/<[0-9]+>/) && parts[index + 1] && parts[index + 1].match(/<\/[0-9]+>/)) {
        // Skip content between markers
    } 
    else {
      // Regular text content
      renderedElements.push(<React.Fragment key={index}>{part}</React.Fragment>);
    }
  });

  return <>{renderedElements}</>;
};
// Note: Given the complexity of robust generic HTML parsing, a real library 
// is always better, but this simple example uses the split array's index 
// to render elements, which is the necessary custom approach here.