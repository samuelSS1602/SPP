# Image Resizing Script for SPP Website
# Resize large WebP images to appropriate dimensions for web display

# Install ImageMagick if not already installed (requires Chocolatey)
# choco install imagemagick -y

$imageFolder = "D:\PROGRAM\SPP"

# Define resize mappings: FileName -> NewWidth x NewHeight
$resizeMappings = @{
    # Room detail modal images (displayed at ~225x150 for grid, ~450x315 on larger screens)
    "ROOM1.webp" = "800x755"    # Retina 2x: 400x377.5
    "ROOM2.webp" = "800x755"
    "ROOM3.webp" = "800x755"
    "ROOM4.webp" = "800x755"
    "ROOM5.webp" = "800x755"
    "ROOM6.webp" = "800x755"
    "ROOM7.webp" = "800x755"
    "ROOM8.webp" = "800x755"
    "ROOM9.webp" = "800x755"
    "ROOM10.webp" = "800x755"
    
    # Bathroom images (portrait orientation)
    "BATHROOM1.webp" = "600x565"   # Retina: 300x282.5
    "BATHROOM2.webp" = "600x565"
    "BATHROOM3.webp" = "600x565"
    "BATHROOM4.webp" = "600x565"
    
    # Corridor images
    "CORRIDOR1.webp" = "800x755"
    "CORRIDOR2.webp" = "800x755"
    "CORRIDOR3.webp" = "800x755"
    "CORRIDOR4.webp" = "800x755"
}

Write-Host "Starting image resize process..." -ForegroundColor Green

foreach ($file in $resizeMappings.Keys) {
    $imagePath = Join-Path $imageFolder $file
    $dimensions = $resizeMappings[$file]
    
    if (Test-Path $imagePath) {
        Write-Host "Resizing $file to $dimensions..." -ForegroundColor Cyan
        
        # Create backup
        $backupPath = $imagePath + ".bak"
        if (-not (Test-Path $backupPath)) {
            Copy-Item $imagePath $backupPath
            Write-Host "  Backup created" -ForegroundColor Gray
        }
        
        # Resize using ImageMagick (magick)
        try {
            & magick "$imagePath" -resize "$dimensions" -quality 85 "$imagePath"
            Write-Host "  ✓ Resized successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Error: $_" -ForegroundColor Red
            Write-Host "  Make sure ImageMagick is installed: choco install imagemagick -y" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "  ⚠ File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nImage resize complete!" -ForegroundColor Green
Write-Host "Total backup folder contains original images." -ForegroundColor Cyan
