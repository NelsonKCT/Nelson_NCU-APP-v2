import {
  Box,
  Button,
  Heading,
  Input,
  NativeBaseProvider,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { Text } from 'react-native';

import firebase_controller from '../../firebase_func';
import DateTimePicker from '../components/DateTimePicker';
import ImagePicker from '../components/ImagePicker';
import { styles } from '../stylesheet';

//預設為Dark Mode
function CreateEventScreen({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [imgUrl, setImgUrl] = useState(''); //firebase storage url
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
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Heading size="lg" marginLeft={140}>
          活動列表
        </Heading>
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
          <DateTimePicker
            label="開始時間"
            value={startDate}
            onChange={setStartDate}
            minimumDate={new Date()}
          />
          <DateTimePicker
            label="結束時間"
            value={endDate}
            onChange={setEndDate}
            minimumDate={startDate}
          />
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
        <ImagePicker onImageSelected={setImgUrl} />
        <VStack space={4} marginTop={3} alignItems="center">
          <Button onPress={handleAddEvent}>新增活動</Button>
          <Button onPress={() => navigation.navigate('EventMainScreen')}>
            返回活動列表
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default CreateEventScreen;
