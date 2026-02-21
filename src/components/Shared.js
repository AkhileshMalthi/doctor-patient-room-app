import React from 'react';
import { View, ScrollView as NativeScrollView } from 'react-native';
import { SafeAreaView as NativeSafeAreaView } from 'react-native-safe-area-context';

export const SafeAreaView = ({ children, className = "" }) => (
    <NativeSafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
        <View className={`flex-1 flex-col ${className}`}>
            {children}
        </View>
    </NativeSafeAreaView>
);

export const ScrollView = ({ children, className = "" }) => (
    <NativeScrollView className={`flex-grow ${className}`} showsVerticalScrollIndicator={false}>
        {children}
    </NativeScrollView>
);
