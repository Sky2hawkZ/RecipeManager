import RNFS from 'react-native-fs';

// Save image to app's Documents directory
interface SaveImageResult {
  destPath: string | null;
  relativePath: string | null;
  error?: Error;
}

export const saveImageToDocuments = async (
  recipeName: string,
  sourceUri: string,
): Promise<SaveImageResult> => {
  try {
    // Create images directory if it doesn't exist
    const imagesDir = `${RNFS.DocumentDirectoryPath}/images`;
    const dirExists: boolean = await RNFS.exists(imagesDir);

    if (!dirExists) {
      await RNFS.mkdir(imagesDir);
    }

    // Generate a unique filename based on timestamp and random string
    const fileName: string = `recipe_${Date.now()}_${recipeName}.jpg`;
    const destPath: string = `${imagesDir}/${fileName}`;
    const relativePath: string = `/images/${fileName}`;

    // Copy the file from the temp location to our app's documents directory
    await RNFS.copyFile(sourceUri, destPath);

    return {destPath, relativePath};
  } catch (error) {
    console.error('Error saving image:', error);
    return {destPath: null, relativePath: null, error: error as Error};
  }
};

// For displaying the image, consider this helper function
export const getImageSource = (imagePath: string): string => {
  if (!imagePath) {
    return '';
  }

  // If it's a full URL or a temporary file path
  if (imagePath.startsWith('http') || imagePath.startsWith('file://')) {
    return imagePath;
  }

  // If path starts with a slash, it's relative to the document directory
  if (imagePath.startsWith('/')) {
    return `${RNFS.DocumentDirectoryPath}${imagePath}`;
  }

  return '';
};


/**
 * Delete an image using the image path stored in the recipe table
 * @param imagePath The relative path stored in the recipe table
 * @returns Object indicating success/failure and any error
 */
export const deleteImageFromDocuments = async (imagePath: string): Promise<{success: boolean; error?: Error}> => {
  try {
    // Return early if no image path is provided
    if (!imagePath) {
      return { success: false, error: new Error('No image path provided') };
    }

    // Get the absolute path to the image
    const absoluteImagePath = getImageSource(imagePath);

    // Check if file exists
    const fileExists = await RNFS.exists(absoluteImagePath);

    if (fileExists) {
      // Delete the file
      await RNFS.unlink(absoluteImagePath);
      return { success: true };
    } else {
      // File doesn't exist, consider this a success since we wanted it gone anyway
      return { success: true };
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error: error as Error };
  }
};
