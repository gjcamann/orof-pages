# Optimal Rate of Failure - Setup Guide

Complete setup instructions for the Optimal Rate of Failure website.

---

## Table of Contents

1. [Visual Assets Setup](#visual-assets-setup)
2. [Google Form & Sheets Integration](#google-form--sheets-integration)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Testing Your Site](#testing-your-site)
5. [Troubleshooting](#troubleshooting)

---

## Visual Assets Setup

### Step 1: Download Your Visual Assets

You have three visual assets from your Gemini shares:
- **Background Pattern**: https://g.co/gemini/share/5531274b7565
- **Hero Image**: https://g.co/gemini/share/5778eb270df8
- **Icon/Favicon**: https://g.co/gemini/share/c6d5bd5d4b02

### Step 2: Save Images to Your Project

1. Visit each Gemini share link in your browser
2. Download/save each image
3. Rename them as follows:
   - Background → `background-pattern.webp`
   - Hero → `hero-optimal-failure.webp`
   - Icon → `icon-optimal-failure.webp`

4. Place all three files in the `images/` directory of your project:
   ```
   orof-pages/
   ├── images/
   │   ├── background-pattern.webp
   │   ├── hero-optimal-failure.webp
   │   └── icon-optimal-failure.webp
   ```

**Note:** If your images are in a different format (PNG, JPG, etc.), either:
- Convert them to WebP using an online converter, OR
- Update the file extensions in `index.html`, `manifesto.html`, and `css/style.css`

---

## Google Form & Sheets Integration

### Overview

The contact form submits data to a Google Sheet via a Google Form. This is a free, no-backend solution perfect for GitHub Pages.

### Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click **"+ Blank form"**
3. Title it: **"Optimal Rate of Failure - Contact Submissions"**

### Step 2: Add Form Fields

Add the following fields **in this exact order** with these settings:

| Field Label | Type | Required |
|------------|------|----------|
| Name | Short answer | Yes |
| Email | Short answer | Yes |
| Company/Organization | Short answer | No |
| Type of Inquiry | Dropdown | Yes |
| Message | Paragraph | Yes |

**For "Type of Inquiry" dropdown**, add these options:
- Partner
- User
- Investor
- General

### Step 3: Link Form to Google Sheet

1. In your Google Form, click the **"Responses"** tab
2. Click the **Google Sheets icon** (green spreadsheet icon)
3. Select **"Create a new spreadsheet"**
4. Name it: **"Contact Form Responses"**

### Step 4: Get Your Form ID

1. In your Google Form, click **"Send"** button (top right)
2. Click the **link icon** (<>)
3. Copy the form URL. It will look like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform
   ```
4. The part after `/d/e/` and before `/viewform` is your **Form ID**
   ```
   Example: 1FAIpQLSc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

### Step 5: Get Entry IDs for Each Field

This is the trickiest part but essential for the form to work.

1. Open your Google Form in a **new browser window**
2. Right-click anywhere on the page → **"Inspect"** or press `F12`
3. Click the **"Network"** tab in Developer Tools
4. Fill out the form with test data
5. Click **"Submit"**
6. In the Network tab, look for a request to **"formResponse"**
7. Click on it, then click the **"Payload"** or **"Form Data"** tab
8. You'll see entries like:
   ```
   entry.123456789: John Doe
   entry.987654321: john@example.com
   entry.555555555: Acme Corp
   entry.444444444: Partner
   entry.333333333: I'm interested in partnering...
   ```

9. **Map each entry ID to its field:**
   - `entry.123456789` → Name
   - `entry.987654321` → Email
   - `entry.555555555` → Company
   - `entry.444444444` → Type of Inquiry
   - `entry.333333333` → Message

### Step 6: Update JavaScript Configuration

1. Open `js/script.js` in your project
2. Find the `GOOGLE_FORM_CONFIG` object (near the top)
3. Replace the placeholder values with your actual values:

```javascript
const GOOGLE_FORM_CONFIG = {
    formId: '1FAIpQLSc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Your Form ID

    entries: {
        name: 'entry.123456789',        // Replace with your Name entry ID
        email: 'entry.987654321',       // Replace with your Email entry ID
        company: 'entry.555555555',     // Replace with your Company entry ID
        inquiryType: 'entry.444444444', // Replace with your Inquiry Type entry ID
        message: 'entry.333333333'      // Replace with your Message entry ID
    }
};
```

4. Save the file

### Step 7: Test Form Submission

1. Open your site locally or after deployment
2. Click **"Inquire"** or any CTA button
3. Fill out and submit the form
4. Check your **Google Sheet** to verify the data appeared

**Important:** The form will work even if you see CORS errors in the browser console. This is expected behavior when submitting to Google Forms from external sites.

---

## GitHub Pages Deployment

### Step 1: Ensure You're on the Correct Branch

```bash
git branch
```

You should be on: `claude/optimal-failure-website-011CUjzQyz9UP8HtQ3qiRNJJ`

### Step 2: Add and Commit Your Changes

```bash
# Add all files
git add .

# Commit with a descriptive message
git commit -m "Initial commit: Complete Optimal Rate of Failure website with Google Sheets integration"
```

### Step 3: Push to GitHub

```bash
# Push to the current branch
git push -u origin claude/optimal-failure-website-011CUjzQyz9UP8HtQ3qiRNJJ
```

### Step 4: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **"Settings"** tab
3. Scroll to **"Pages"** in the left sidebar
4. Under **"Source"**, select your branch: `claude/optimal-failure-website-011CUjzQyz9UP8HtQ3qiRNJJ`
5. Keep the folder as **"/ (root)"**
6. Click **"Save"**

### Step 5: Access Your Live Site

After a few minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

GitHub will show you the exact URL in the Pages settings.

---

## Testing Your Site

### Local Testing

Before deploying, test locally:

1. **Using Python (if installed):**
   ```bash
   # Python 3
   python -m http.server 8000

   # Then visit: http://localhost:8000
   ```

2. **Using Node.js (if installed):**
   ```bash
   npx http-server -p 8000

   # Then visit: http://localhost:8000
   ```

3. **Or simply open `index.html` directly in your browser**

### What to Test

- ✅ Landing page displays correctly with hero image
- ✅ Glitch animation on hero image
- ✅ "Inquire" button opens modal
- ✅ Modal can be closed (X button, clicking outside, or Escape key)
- ✅ Navigation to Manifesto page works
- ✅ Manifesto content displays with highlighted keywords
- ✅ All three CTA buttons open the contact form
- ✅ Contact form validation works
- ✅ Form submission sends data to Google Sheet
- ✅ Responsive design works on mobile/tablet

---

## Troubleshooting

### Images Not Showing

**Problem:** Images appear as broken links

**Solutions:**
1. Verify image files are in the `images/` directory
2. Check that filenames match exactly (case-sensitive):
   - `background-pattern.webp`
   - `hero-optimal-failure.webp`
   - `icon-optimal-failure.webp`
3. If using different image formats, update all references in HTML/CSS

### Contact Form Not Submitting to Google Sheets

**Problem:** Form submits but data doesn't appear in Google Sheet

**Solutions:**
1. Double-check your Form ID in `js/script.js`
2. Verify all entry IDs are correct (repeat Step 5 from Google Form setup)
3. Ensure the Google Form is not set to "Accepting responses: Disabled"
4. Check that the Google Sheet is linked to the form (Responses tab → Sheets icon)

### Modal Not Opening

**Problem:** Clicking buttons doesn't open the contact form

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify `contact.html` exists in the root directory
3. Ensure `js/script.js` is properly linked in HTML files
4. Try hard-refreshing the page (Ctrl+Shift+R or Cmd+Shift+R)

### CORS Errors in Console

**This is normal!** Google Forms blocks cross-origin requests, but the form submission still works. You can safely ignore these errors. Verify submissions by checking your Google Sheet.

### GitHub Pages Not Updating

**Problem:** Changes don't appear on the live site

**Solutions:**
1. Wait 5-10 minutes after pushing (GitHub Pages can be slow)
2. Hard refresh the page (Ctrl+Shift+R)
3. Clear your browser cache
4. Check GitHub Actions tab for deployment status
5. Verify you pushed to the correct branch

### Styling Issues

**Problem:** Site doesn't look right

**Solutions:**
1. Verify `css/style.css` is properly linked in all HTML files
2. Check for CSS syntax errors
3. Test in different browsers (Chrome, Firefox, Safari)
4. Check browser console for 404 errors on CSS file

---

## Project Structure Reference

```
orof-pages/
├── index.html              # Landing page
├── manifesto.html          # Manifesto/About page
├── contact.html            # Contact form (loaded in modal)
├── css/
│   └── style.css          # All styles and animations
├── js/
│   └── script.js          # Modal, form handling, Google Sheets integration
├── images/
│   ├── background-pattern.webp
│   ├── hero-optimal-failure.webp
│   └── icon-optimal-failure.webp
├── SETUP.md               # This file
└── README.md              # Project overview
```

---

## Additional Resources

- [Google Forms Documentation](https://support.google.com/docs/answer/6281888)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [WebP Image Format Info](https://developers.google.com/speed/webp)

---

## Support

If you encounter issues not covered in this guide:

1. Check browser console for error messages
2. Verify all file paths and names
3. Test in different browsers
4. Check GitHub repository settings

---

**Ready to launch?** Follow the deployment steps and share your Optimal Rate of Failure site with the world! 🚀
