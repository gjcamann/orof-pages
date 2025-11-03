# Visual Assets Directory

## Required Images

This directory needs three image files for the website to display correctly:

### 1. Background Pattern
- **Filename:** `background-pattern.webp`
- **Source:** https://g.co/gemini/share/5531274b7565
- **Usage:** Repeating background pattern across all pages

### 2. Hero Image
- **Filename:** `hero-optimal-failure.webp`
- **Source:** https://g.co/gemini/share/5778eb270df8
- **Usage:** Main hero image on landing page with glitch effect

### 3. Icon/Favicon
- **Filename:** `icon-optimal-failure.webp`
- **Source:** https://g.co/gemini/share/c6d5bd5d4b02
- **Usage:** Browser tab icon and site branding

---

## How to Add Images

1. **Download each image from the Gemini share links above**
2. **Rename them exactly as shown** (case-sensitive)
3. **Place them in this directory** (`images/`)

After adding all three images, your directory should look like:

```
images/
├── background-pattern.webp
├── hero-optimal-failure.webp
├── icon-optimal-failure.webp
├── .gitkeep
└── IMAGES.md (this file)
```

---

## Alternative Image Formats

If your images are in a different format (PNG, JPG, etc.), you can either:

**Option 1: Convert to WebP (Recommended)**
- Use an online converter like [CloudConvert](https://cloudconvert.com/webp-converter)
- WebP offers better compression and quality

**Option 2: Update File References**
- If using PNG, rename to: `background-pattern.png`, `hero-optimal-failure.png`, `icon-optimal-failure.png`
- Update references in:
  - `index.html` (lines with image src)
  - `manifesto.html` (lines with image src)
  - `css/style.css` (background-image URL)

---

## Image Specifications

For best results, ensure:
- **Background Pattern:** Tileable, ~300x300px or larger
- **Hero Image:** High resolution, suitable for full-width display
- **Icon:** Square aspect ratio, minimum 512x512px

---

**Note:** The site will still function without images, but will show broken image icons. Add the images as soon as possible for the best experience.
