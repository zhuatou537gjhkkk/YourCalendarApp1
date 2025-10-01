// src/screens/MonthScreen.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MonthScreen = () => {
    return (
        <Calendar
            style={styles.calendar}
            onDayPress={day => {
                console.log('selected day', day); // 点击日期时会在控制台打印信息
            }}
        />
    );
};

const styles = StyleSheet.create({
    calendar: {
        // 你可以在这里添加样式
    },
});

export default MonthScreen;