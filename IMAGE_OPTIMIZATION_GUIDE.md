# Image Optimization Guide for SPP Website

## Problem
Your images are **14.9 MB total** but could be reduced to **~500 KB - 2 MB** by resizing them to appropriate web dimensions.

Current image dimensions: **4749x4480 pixels** (way too large!)
Display dimensions: **225x150 pixels** (actual size on screen)

**Potential Savings: ~14.3 MB!**

---

## Solution: Resize Images to Web-Appropriate Dimensions

### Recommended Dimensions by Use Case

**Room Photos (Landscape):**
- Source: 4749x4480 px → Resize to: **800x755 px** (retina 2x)
- Files: ROOM1-10.webp, CORRIDOR1-4.webp
- Estimated savings: ~65-75% per image

**Bathroom Photos (Portrait):**
- Source: 4480x4218 px → Resize to: **600x565 px** (retina 2x)
- Files: BATHROOM1-4.webp
- Estimated savings: ~65-75% per image

---

## How to Resize Images

### Option 1: Using PowerShell Script (Windows) - **RECOMMENDED**

1. Install ImageMagick:
   ```powershell
   choco install imagemagick -y
   ```
   
   Or manually download from: https://imagemagick.org/script/download.php

2. Run the resize script:
   ```powershell
   cd D:\PROGRAM\SPP
   .\resize_images.ps1
   ```

3. Script will:
   - ✓ Create backups of original images
   - ✓ Resize all images to optimal dimensions
   - ✓ Compress with 85% quality (minimal quality loss)
   - ✓ Show progress for each file

---

### Option 2: Using Online Tools

1. **TinyWebP** (https://tinypng.com or https://imagecompressor.com)
   - Upload each image
   - Resize to recommended dimensions
   - Download compressed version

2. **Batch Processing with GIMP:**
   - File → Scripts → Batch Process
   - Resize all to target dimensions
   - Export as WebP with quality 85

---

### Option 3: Manual Resize Command

**Windows PowerShell using ImageMagick:**
```powershell
# Individual image resize
magick ROOM1.webp -resize 800x755 -quality 85 ROOM1.webp

# All room images
Get-ChildItem ROOM*.webp | ForEach-Object {
    magick $_.FullName -resize 800x755 -quality 85 $_.FullName
}

# All bathroom images
Get-ChildItem BATHROOM*.webp | ForEach-Object {
    magick $_.FullName -resize 600x565 -quality 85 $_.FullName
}
```

---

## Expected Results After Resizing

| Image | Before | After | Savings |
|-------|--------|-------|---------|
| ROOM2.webp | 2,955.4 KiB | ~450 KiB | ~85% |
| ROOM3.webp | 2,779.6 KiB | ~420 KiB | ~85% |
| ROOM4.webp | 2,434.7 KiB | ~370 KiB | ~85% |
| BATHROOM1.webp | 2,167.3 KiB | ~330 KiB | ~85% |
| **TOTAL** | **~14,950 KiB** | **~2,300 KiB** | **~85%** |

---

## Why These Dimensions?

1. **800x755** for room photos:
   - Desktop: Displays at 225-400px
   - Tablet: Displays at 300-600px
   - Mobile: Displays at 150-300px
   - 2x retina scaling covered

2. **600x565** for bathroom photos:
   - Maintains 4:3 aspect ratio
   - Works for both portrait and grid layouts
   - Smaller file while maintaining quality

---

## After Resizing

1. **No HTML/CSS changes needed** - the images will scale automatically
2. **Lazy loading still works** - images only load when needed
3. **Much faster page load** - LCP will improve significantly
4. **Better mobile experience** - smaller downloads on cellular

---

## Quality Check

After resizing, test that:
- ✓ Images look sharp and clear
- ✓ No visible compression artifacts
- ✓ Colors are accurate
- ✓ Details are preserved

If quality is insufficient at 85%, try 90% quality instead (slightly larger files but better results).

---

## Lighthouse Impact

After optimization, expect:
- ✓ **LCP improvement**: Likely improve 2-3 seconds
- ✓ **File size reduction**: From 14.9 MB → 1.8-2.5 MB (85% saving)
- ✓ **Better Lighthouse score**: +20-30 points
- ✓ **Faster perceived load**: Users see content sooner

