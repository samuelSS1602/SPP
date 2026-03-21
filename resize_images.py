#!/usr/bin/env python3
from PIL import Image
import os
from pathlib import Path

# Image folder
image_folder = r"D:\PROGRAM\SPP"

# Resize mappings
resize_mappings = {
    # Room images (landscape)
    "ROOM1.webp": (800, 755),
    "ROOM2.webp": (800, 755),
    "ROOM3.webp": (800, 755),
    "ROOM4.webp": (800, 755),
    "ROOM5.webp": (800, 755),
    "ROOM6.webp": (800, 755),
    "ROOM7.webp": (800, 755),
    "ROOM8.webp": (800, 755),
    "ROOM9.webp": (800, 755),
    "ROOM10.webp": (800, 755),
    # Bathroom images (portrait)
    "BATHROOM1.webp": (600, 565),
    "BATHROOM2.webp": (600, 565),
    "BATHROOM3.webp": (600, 565),
    "BATHROOM4.webp": (600, 565),
    # Corridor images (landscape)
    "CORRIDOR1.webp": (800, 755),
    "CORRIDOR2.webp": (800, 755),
    "CORRIDOR3.webp": (800, 755),
    "CORRIDOR4.webp": (800, 755),
}

print("Starting image resize process...")
print("=" * 60)

success_count = 0
skip_count = 0
error_count = 0

for filename, dimensions in resize_mappings.items():
    image_path = os.path.join(image_folder, filename)
    width, height = dimensions
    
    print(f"\nResizing {filename} to {width}x{height}...")
    
    if not os.path.exists(image_path):
        print(f"  SKIP - File not found")
        skip_count += 1
        continue
    
    try:
        # Create backup
        backup_path = image_path + ".bak"
        if not os.path.exists(backup_path):
            with open(image_path, 'rb') as f_in:
                with open(backup_path, 'wb') as f_out:
                    f_out.write(f_in.read())
            print(f"  Backup created: {filename}.bak")
        
        # Open and resize image
        img = Image.open(image_path)
        print(f"  Original size: {img.size[0]}x{img.size[1]}")
        
        # Resize with LANCZOS filter for best quality
        img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Save with quality 85
        img_resized.save(image_path, 'WEBP', quality=85)
        
        # Get new file size
        new_size_kb = os.path.getsize(image_path) / 1024
        print(f"  OK - Resized to {width}x{height}")
        print(f"  File size: {new_size_kb:.1f} KiB")
        
        success_count += 1
        
    except Exception as e:
        print(f"  ERROR - {str(e)}")
        error_count += 1

print("\n" + "=" * 60)
print(f"Resize complete!")
print(f"  Success: {success_count}")
print(f"  Skipped: {skip_count}")
print(f"  Errors: {error_count}")
print("=" * 60)
