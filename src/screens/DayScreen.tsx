// src/screens/DayScreen.tsx

import React, { useState, useCallback } from 'react'; // 变化1：多导入一个 useCallback
import { StyleSheet, View, Text } from 'react-native';
import { Agenda, AgendaEntry, DateData } from 'react-native-calendars';

// 我们的模拟数据源保持不变
const mockDataSource: { [date: string]: AgendaEntry[] } = {
    '2025-10-30': [{ name: '项目启动会', height: 60, day: '2025-10-30' }],
    '2025-10-31': [
        { name: '完成功能设计文档', height: 80, day: '2025-10-31' },
        { name: '与导师开会', height: 60, day: '2025-10-31' },
    ],
    '2025-11-01': [{ name: '开始编码！', height: 60, day: '2025-11-01' }],
};

const DayScreen = () => {
    // 变化2：创建一个 state 用于存放要展示给 Agenda 的日程
    const [items, setItems] = useState<{ [date: string]: AgendaEntry[] }>({});

    // 变化3：这是本次修改的核心。
    // 这个函数会在 Agenda 组件需要新数据时（比如滑动到新的月份）被自动调用
    const loadItems = (day: DateData) => {
        // 使用 setTimeout 模拟网络请求的延迟
        setTimeout(() => {
            const newItems = { ...items };

            // Agenda 组件要求在显示的日期范围内，每一天都必须有数据（即使是空数组）
            // 我们这里简单处理：当需要数据时，直接把所有模拟数据加载进去
            // 在真实应用中，这里会根据 day.month 去请求对应月份的数据
            for (const dateKey in mockDataSource) {
                newItems[dateKey] = mockDataSource[dateKey];
            }

            // 如果 items 中已经有了数据，为了避免无限循环，可以不再更新
            // 但对于我们这个静态数据的例子，直接加载所有数据更简单
            setItems(mockDataSource);
        }, 1000); // 模拟1秒的加载时间
    };

    // 变化4：使用 useCallback 包裹 renderItem 以获得性能优化
    const renderItem = useCallback((item: AgendaEntry) => {
        return (
            <View style={[styles.item, { height: item.height }]}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        );
    }, []);

    return (
        <Agenda
            // 变化5：将 items 属性绑定到我们的 state
            items={items}
            // 变化6：使用 loadItemsForMonth 替代之前直接传递所有数据的方式
            loadItemsForMonth={loadItems}
            selected={'2025-10-31'}
            renderItem={renderItem}
            renderEmptyData={() => {
                return (
                    <View style={styles.emptyData}>
                        <Text>这里是空的，可以向上或向下滑动加载日程</Text>
                    </View>
                );
            }}
        />
    );
};

// ... 样式 (styles) 部分保持不变
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
    },
    itemText: {
        color: '#333',
        fontSize: 16,
    },
    emptyData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DayScreen;