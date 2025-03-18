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
    console.log('Running correct path');
    return `${RNFS.DocumentDirectoryPath}${imagePath}`;
  }

  return '';
};
