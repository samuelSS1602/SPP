import os
import glob

folder = r"D:\PROGRAM\SPP"
bak_files = glob.glob(os.path.join(folder, "*.bak"))

print(f"Found {len(bak_files)} .bak files to delete")
print("=" * 60)

for file in bak_files:
    try:
        os.remove(file)
        print(f"Deleted: {os.path.basename(file)}")
    except Exception as e:
        print(f"Error deleting {os.path.basename(file)}: {e}")

print("=" * 60)
print(f"Cleanup complete! Deleted {len(bak_files)} backup files.")
