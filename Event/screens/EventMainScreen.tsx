import { Box, Heading, NativeBaseProvider, extendTheme } from 'native-base';
import React, { useEffect, useState } from 'react';

import firebase_controller from '../../firebase_func';
import { styles } from '../stylesheet';

type FirebaseTimestamp = {
  nanoseconds: number;
  seconds: number;
};

type Event = {
  COST: string;
  END_TIME: FirebaseTimestamp;
  IMG: string;
  INTRO: string;
  NAME: string;
  PLACE: string;
  START_TIME: FirebaseTimestamp;
  id: string;
};

//預設為Dark Mode
function EventMainScreen({ navigation }: any) {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };
  const [events, setEvents] = useState<Event[]>([]); //所有活動會存在 events ，一個Event type的陣列

  const customTheme = extendTheme({ config });

  useEffect(() => {
    const fetchEvents = async () => {
      //取得所有event資料
      const eventsData: Event[] = await firebase_controller.getEvents();
      // console.log(eventsData[0]); //測試
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box style={styles.container}>
        <Heading size="lg" marginLeft={140}>
          活動列表
        </Heading>
      </Box>
    </NativeBaseProvider>
  );
}
export default EventMainScreen;
