$imageFolder = "D:\PROGRAM\SPP"

$resizeMappings = @{
    "ROOM1.webp" = "800x755"
    "ROOM2.webp" = "800x755"
    "ROOM3.webp" = "800x755"
    "ROOM4.webp" = "800x755"
    "ROOM5.webp" = "800x755"
    "ROOM6.webp" = "800x755"
    "ROOM7.webp" = "800x755"
    "ROOM8.webp" = "800x755"
    "ROOM9.webp" = "800x755"
    "ROOM10.webp" = "800x755"
    "BATHROOM1.webp" = "600x565"
    "BATHROOM2.webp" = "600x565"
    "BATHROOM3.webp" = "600x565"
    "BATHROOM4.webp" = "600x565"
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
        
        $backupPath = $imagePath + ".bak"
        if (-not (Test-Path $backupPath)) {
            Copy-Item $imagePath $backupPath
            Write-Host "  Backup created" -ForegroundColor Gray
        }
        
        try {
            & magick "$imagePath" -resize "$dimensions" -quality 85 "$imagePath"
            Write-Host "  OK - Resized successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "  ERROR - $_" -ForegroundColor Red
            Write-Host "  Install ImageMagick: choco install imagemagick -y" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "  SKIP - File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "Image resize complete!" -ForegroundColor Green
