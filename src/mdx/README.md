
# This document explains how to write MDX content for the site - what elements are supported, how to format them, and best practices for accessibility and consistency.

##  Adding a New  News MDX File

All blog or news articles are written as **MDX files** and placed inside the `/news/` directory.

###  File Location & Naming Convention

- Folder: `/news/`
- File format: `first-post` (all lowercase, hyphens instead of spaces)
- Example filename:  first-post.mdx

## Example File

```tsc
export const frontmatter = {
  id: 1,
  date: "JULY 2025",
  desc: "Advanced molecular modeling breakthrough in pharmaceutical compounds",
  img: "https://placekitten.com/400/200",
};

# Advanced Molecular Modeling Breakthrough
## Recent research in **AI-driven molecular modeling** has accelerated drug discovery...
### Computational chemistry teams report up to *30% faster* synthesis predictions.
```
#### Each file should have formatter key-value 
| Key | type | Description |
|------------|--------|-------------|
| id       | number | Unique numeric identifier for the post. Must be unique across all files. |
| date     | string | The publication date (month/year or full date). |
| desc      | string | Short one-line description that appears in the news list or card preview. |
| desc      | string |Full image URL for the news card or header banner. Should be a valid hosted image. |

## Headings
### Use hierarchical headings (h1–h6) in order - do not skip levels.

```tsc 
# H1 - Page Title  
## H2 - Section Title  
### H3 - Subsection  
``` 
## Paragraphs & Text Formatting
```tsc
This is a normal paragraph.

**Bold text**  
*Italic text*  
***Bold and italic text***  
~~Strikethrough~~  
```

## Links
##### Use markdown syntax for links.
#####  Always include meaningful link text and a valid href

#### Internal Link
```tsc
[our about page](/contact)
```

#### External Link
```tsc
[Visit OpenAI](https://openai.com)
```

## Images
```tsc
// import the image inside mdxImages folder
import getAssetUrl from "../getAssetUrl"

<AccessibleImage 
  src={getAssetUrl("/mdxImages/vite.avif", { w: 500, q: 80, v: "1" })}
  alt="Person using a laptop in an office" 
  width="600"
  height="400"
/>

OR 

// import the image inside mdxImages folder
import {MdxImage} from "../Component/MdxImage"

<MdxImage
  src="/mdxImages/vite.avif"
  alt="Hero image for news"
  width={500}
  height={300}
  className="rounded-lg"
  getAssetOptions={{ q: 80, v: "1" }}
/>

```
### Image Position (Left / Center / Right)

Authors can control image alignment using Tailwind’s flexbox utilities.  
Wrap your `<img>` inside a `<div>` with a `flex` container and the desired `justify-*` class.

| Alignment | Class | Description |
|------------|--------|-------------|
| Left       | `justify-start` | Aligns the image to the left edge. |
| Center     | `justify-center` | Centers the image horizontally. |
| Right      | `justify-end` | Aligns the image to the right edge. |

#### Example Usage

```tsc
import getAssetUrl from "../getAssetUrl"

<div className="flex justify-end">
  <AccessibleImage 
    src={getAssetUrl("/mdxImages/vite.avif", { w: 500, q: 80, v: "1" })}
    alt="A cute kitten" 
    className="rounded-lg"
  />
</div>
```

## Tables
```tsc 
| Name  | Role       | Country |
|--------|-------------|----------|
| Sameer | Developer  | India    |
| Alice  | Designer   | USA      |
```
## Lists

### Unordered
```tsc 
- First item
- Second item
  - Nested item
```

### Ordered
```tsc
1. Step one
2. Step two
```

### Task Lists
```tsc
- [x] Task completed
- [ ] Task pending
```

## Custom Components

### Alert
 type error and info available

```tsc 
<Alert type="info">
  This is an info alert.
</Alert>
```

## Layout Helpers

### Two-column / Flex Layout

Use the `<FlexImageText>` MDX component to display an image and text side-by-side.  
It automatically stacks vertically on mobile and switches to a horizontal layout on larger screens.

| Prop | Type | Description |
|------|------|-------------|
| `imgSrc` | `string` | Image source URL |
| `imgAlt` | `string` | Alt text for accessibility |
| `imgPosition` | `"left"` \| `"right"` | Controls whether the image appears on the left or right |

#### Example Usage

```tsc
// import the image inside mdxImages folder
import getAssetUrl from "../getAssetUrl"

<FlexImageText 
  imgSrc={getAssetUrl("/mdxImages/vite.avif", { w: 500, q: 80, v: "1" })}
  imgAlt="Kitten" 
  imgPosition="left"
>
  <div>
    Supporting text goes here.  
    This text will appear on the **right side** of the image on desktop,  
    and below the image on smaller screens.
  </div>
</FlexImageText>
```

### Text Alignment
```tsc
<p style={{ textAlign: "left" }}>Left aligned text</p>
<p style={{ textAlign: "center" }}>Centered text</p>
<p style={{ textAlign: "right" }}>Right aligned text</p>
```

### Embedding Videos (YouTube)
```tsc
<iframe 
  width="560" 
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="YouTube video player" 
  frameBorder="0" 
  allowFullScreen
/>
```