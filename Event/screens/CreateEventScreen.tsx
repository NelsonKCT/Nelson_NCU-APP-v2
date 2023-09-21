import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { MediaLibrary } from 'expo-media-library';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  NativeBaseProvider,
  VStack,
  extendTheme,
} from 'native-base';
import { useState } from 'react';
import { Image, Text } from 'react-native';
import firebase_controller, { storage } from '../../firebase_func';
import { styles } from '../stylesheet';

//預設為Dark Mode
function CreateEventScreen({ navigation }) {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  const customTheme = extendTheme({ config });

  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImagePickerResult | null>(
    null,
  );
  const [imgUrl, setImgUrl] = useState(''); //firebase storage url
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //處理輸入的活動資訊
  const handleEventNameChange = (text: string) => {
    setEventName(text);
  };

  const handleEventLocationChange = (text: string) => {
    setEventLocation(text);
  };

  const handleEventCostChange = (text: string) => {
    setEventCost(text);
  };

  const handleEventDescriptionChange = (text: string) => {
    setEventDescription(text);
  };

  // 選擇開始日期
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // 選擇結束日期
  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  //顯示開始日期選擇器
  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };
  //顯示結束日期選擇器
  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };
  //上傳照片
  const handleUploadImage = async () => {
    const result = await launchImageLibraryAsync();
    if (!result.canceled) {
      const { uri } = result.assets[0];

      try {
        // const storageRef = ref(storage, `images/${uri}`);
        // const uploadTask = uploadBytes(storageRef, uri);
        // const url = await getDownloadURL(storageRef);
        //url是圖片的網址，直接打在瀏覽器上可以連到那張照片

        const asset = await MediaLibrary.createAssetAsync(uri);

        const storageRef = ref(storage, `/images/${asset.id}`);
        const uploadTask = uploadBytes(storageRef, asset);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);

        // 將下載連結儲存到狀態中或其他需要使用的地方
        setSelectedImage(downloadURL);
        setImgUrl(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  //活動儲存至firebase (backend)
  const handleAddEvent = async () => {
    const eventInfo = {
      NAME: eventName,
      START_TIME: startDate,
      END_TIME: endDate,
      PLACE: eventLocation,
      COST: eventCost,
      INTRO: eventDescription,
      IMG: imgUrl,
    };
    firebase_controller.add(eventInfo);
  };

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box style={styles.container}>
        <HStack>
          <Button
            marginLeft={4}
            onPress={() => navigation.navigate('EventMainScreen')}>
            返回
          </Button>
          <Heading size="lg" marginLeft={60}>
            新增活動
          </Heading>
        </HStack>
        <VStack space={3} marginTop={3}>
          <Text style={styles.text}>活動名稱</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventNameChange}
            value={eventName}
            placeholder="請輸入活動名稱"
            placeholderTextColor="#CCCCCC"
          />
          <HStack space={3} marginTop={3} marginLeft={4}>
            <Button onPress={showStartDatePickerModal}>開始時間</Button>
            {showStartDatePicker && (
              <DateTimePicker
                testID="startDatePicker"
                value={startDate}
                mode="datetime"
                is24Hour
                display="default"
                onChange={handleStartDateChange}
                minimumDate={new Date()}
              />
            )}
          </HStack>
          <HStack space={3} marginTop={3} marginLeft={4}>
            <Button onPress={showEndDatePickerModal}>結束時間</Button>
            {showEndDatePicker && (
              <DateTimePicker
                testID="endDatePicker"
                value={endDate}
                mode="datetime"
                is24Hour
                display="default"
                onChange={handleEndDateChange}
                minimumDate={startDate}
              />
            )}
          </HStack>
          <Text style={styles.text}>
            開始時間 : {startDate.toLocaleDateString()}{' '}
            {startDate.toLocaleTimeString()}
          </Text>
          <Text style={styles.text}>
            結束時間 : {endDate.toLocaleDateString()}{' '}
            {endDate.toLocaleTimeString()}
          </Text>
          <Text style={styles.text}>活動地點</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventLocationChange}
            value={eventLocation}
            placeholder="請輸入活動地點"
            placeholderTextColor="#CCCCCC"
          />
          <Text style={styles.text}>參加費用</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventCostChange}
            value={eventCost}
            placeholder="請輸入參加費用(請輸入數字，無則填0)"
            placeholderTextColor="#CCCCCC"
          />
          <Text style={styles.text}>活動介紹</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventDescriptionChange}
            value={eventDescription}
            placeholder="請介紹你的活動"
            placeholderTextColor="#CCCCCC"
          />
        </VStack>
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
        <VStack space={4} marginTop={3} alignItems="center">
          <Button onPress={handleAddEvent}>新增活動</Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default CreateEventScreen;
