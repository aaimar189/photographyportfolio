import os
import re
from pathlib import Path

def replace_image_captions(file_path):
    """Replace all image captions with 'Andrea Aimar' in the given HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match the caption paragraphs
        # This matches: <p class="text-sm text-gray-500 mt-2 font-raleway italic">ANY TEXT HERE</p>
        pattern = r'(<p class="text-sm text-gray-500 mt-2 font-raleway italic">)([^<]+)(</p>)'
        
        # Count replacements for reporting
        matches = re.findall(pattern, content)
        count = len(matches)
        
        # Replace with "Andrea Aimar"
        new_content = re.sub(pattern, r'\1Andrea Aimar\3', content)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return count
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return 0

def main():
    base_path = Path(__file__).parent
    
    # Define the folders to process
    folders = [
        'events-detail',
        'live-music-detail',
        'reportage-detail'
    ]
    
    total_replacements = 0
    files_processed = 0
    
    print("Starting caption replacement process...\n")
    
    for folder in folders:
        folder_path = base_path / folder
        
        if not folder_path.exists():
            print(f"Warning: Folder {folder} not found. Skipping...\n")
            continue
        
        print(f"Processing folder: {folder}")
        print("-" * 50)
        
        # Get all HTML files in the folder
        html_files = list(folder_path.glob('*.html'))
        
        for html_file in html_files:
            count = replace_image_captions(html_file)
            files_processed += 1
            total_replacements += count
            print(f"  ✓ {html_file.name}: {count} captions replaced")
        
        print()
    
    print("=" * 50)
    print(f"Process completed!")
    print(f"Files processed: {files_processed}")
    print(f"Total captions replaced: {total_replacements}")
    print("=" * 50)

if __name__ == "__main__":
    main()
