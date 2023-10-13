import { MaterialIcons } from '@expo/vector-icons';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { Button, HStack, Image } from 'native-base';
import React, { useState } from 'react';

import firebase_controller from '../../firebase_func';

interface Props {
  onImageSelected: (uri: string) => void;
}

const ImagePickerComponent: React.FC<Props> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<ImagePickerResult | null>(
    null,
  );

  const handleUploadImage = async () => {
    const result = await launchImageLibraryAsync();
    console.log(result.assets[0].uri);
    if (!result.canceled) {
      const { uri } = result.assets[0];
      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const downloadURL = await firebase_controller.uploadImage(blob);

        // 將下載連結儲存到狀態中或其他需要使用的地方
        setSelectedImage({ uri: downloadURL });

        onImageSelected(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <HStack space={3} marginTop={10} marginLeft={5}>
      <Button
        onPress={handleUploadImage}
        startIcon={<MaterialIcons name="add-a-photo" />}>
        上傳照片
      </Button>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 100 }}
        />
      )}
    </HStack>
  );
};

export default ImagePickerComponent;
