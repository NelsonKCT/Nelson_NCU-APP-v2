import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, HStack } from 'native-base';
import React, { useState } from 'react';

interface Props {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
}

const DateTimePickerComponent: React.FC<Props> = ({
  label,
  value,
  onChange,
  minimumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showPickerModal = () => {
    setShowPicker(true);
  };

  return (
    <HStack space={3} marginTop={3} marginLeft={4}>
      <Button onPress={showPickerModal}>{label}</Button>
      {showPicker && (
        <DateTimePicker
          testID={`${label}Picker`}
          value={value}
          mode="datetime"
          is24Hour
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
        />
      )}
    </HStack>
  );
};

export default DateTimePickerComponent;
