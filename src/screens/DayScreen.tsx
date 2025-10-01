// src/screens/DayScreen.tsx

// 【已修正】: 修正了之前愚蠢的语法错误，正确导入了 React 和 useState Hook
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Calendar, AgendaEntry } from 'react-native-calendars';

// 模拟数据源
const allEvents: { [date: string]: AgendaEntry[] } = {
    '2025-10-30': [{ name: '项目启动会', height: 60, day: '2025-10-30' }],
    '2025-10-31': [
        { name: '完成功能设计文档', height: 80, day: '2025-10-31' },
        { name: '与导师开会', height: 60, day: '2025-10-31' },
    ],
    '2025-11-01': [{ name: '开始编码！', height: 60, day: '2025-11-01' }],
};

// 获取今天的日期字符串
const getTodayString = () => new Date().toISOString().split('T')[0];

const DayScreen = () => {
    // 现在 useState 可以被正确找到了
    const [selectedDate, setSelectedDate] = useState(getTodayString());

    const selectedDayEvents = allEvents[selectedDate] || [];

    const renderItem = ({ item }: { item: AgendaEntry }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={day => {
                    setSelectedDate(day.dateString);
                }}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#00adf5' },
                }}
                initialDate={'2025-10-31'}
            />

            <View style={styles.separator} />

            <FlatList
                data={selectedDayEvents}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                ListEmptyComponent={
                    <View style={styles.emptyData}>
                        <Text>当天没有日程安排</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
    },
    emptyData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});

export default DayScreen;