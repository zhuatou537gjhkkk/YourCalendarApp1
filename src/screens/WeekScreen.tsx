// src/screens/WeekScreen.tsx
import React, { useState } from 'react';
import { WeekCalendar } from 'react-native-calendars';

const WeekScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    return (
        <WeekCalendar
            current={selectedDate}
            onDayPress={day => {
                setSelectedDate(day.dateString);
                console.log('selected day', day);
            }}
        />
    );
};

export default WeekScreen;