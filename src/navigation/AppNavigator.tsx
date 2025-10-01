import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MonthScreen from '../screens/MonthScreen';
import WeekScreen from '../screens/WeekScreen';
import DayScreen from '../screens/DayScreen';

// 创建一个底部标签导航器
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: 'center', // 标题居中
            }}>
            <Tab.Screen
                name="Month"
                component={MonthScreen}
                options={{ title: '月视图' }}
            />
            <Tab.Screen
                name="Week"
                component={WeekScreen}
                options={{ title: '周视图' }}
            />
            <Tab.Screen
                name="Day"
                component={DayScreen}
                options={{ title: '日视图' }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;