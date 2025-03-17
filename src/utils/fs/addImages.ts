import RNFS from 'react-native-fs';

// Save image to app's Documents directory
interface SaveImageResult {
  destPath: string | null;
  error?: Error;
}

export const saveImageToDocuments = async (
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
    const fileName: string = `recipe_${Date.now()}_${Math.floor(
      Math.random() * 10000,
    )}.jpg`;
    const destPath: string = `${imagesDir}/${fileName}`;

    // Copy the file from the temp location to our app's documents directory
    await RNFS.copyFile(sourceUri, destPath);

    console.log('Image saved to:', destPath);
    return {destPath};
  } catch (error) {
    console.error('Error saving image:', error);
    return {destPath: null, error: error as Error};
  }
};

// For displaying the image, consider this helper function
export const getImageSource = (imagePath: string) => {
  if (!imagePath) {
    return null;
  }

  // If it's a full URL or a temporary file path
  if (imagePath.startsWith('http') || imagePath.startsWith('file://')) {
    return {uri: imagePath};
  }

  // If it's a local file path in the Documents directory
  return {uri: `file://${imagePath}`};
};
