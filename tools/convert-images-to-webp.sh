#!/bin/bash

# One time script to convert all jpeg, jpg, png image to webp format
# Run the script from the docs root directory to convert all image files in the IMAGE_DIR folder

# Define the directory containing the images
IMAGE_DIR="./static/img"

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed. Please install and try again."
    exit 1
fi

# Find all .jpg, .jpeg, .png files in the directory and its subdirectories
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r FILE; do
    # Get the file extension
    EXT="${FILE##*.}"
    # Get the file path without the extension
    BASENAME="${FILE%.*}"
    # Define the output file name with .webp extension
    OUTPUT_FILE="${BASENAME}.webp"

    # Convert the image to .webp format
    # -q quality of the webp image. Valid values: 0-100  
    cwebp -q 90 "$FILE" -o "$OUTPUT_FILE"

    # Check if the conversion was successful
    if [ $? -eq 0 ]; then
        # Delete the original image file
        rm "$FILE"
        echo "Converted and deleted: $FILE"
    else
        echo "Failed to convert: $FILE"
    fi
done
