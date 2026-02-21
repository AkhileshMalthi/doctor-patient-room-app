import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { ChevronLeft, MoreVertical, Activity, Send } from 'lucide-react-native';
import { SafeAreaView } from '../components/Shared';

export default function PatientChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: "Namaste! I am your medical assistant. Please describe your symptoms. (e.g., 'I have fever' or 'Pet dard ho raha hai')"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const generateAIResponse = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('chest') || lower.includes('pain') || lower.includes('heart')) {
      return "⚠️ I notice you mentioned chest pain. Is the pain radiating to your arm or jaw? If you are sweating or feeling dizzy, please call 108 immediately.";
    }
    if (lower.includes('fever') || lower.includes('bukhar')) {
      return "I've noted the fever. How many days have you had it? Do you have any chills or body aches?";
    }
    return "Understood. Could you tell me a bit more about how long you have been feeling this way? Any other symptoms?";
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => {
      const response = generateAIResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <SafeAreaView className="bg-slate-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-slate-100 flex-row items-center justify-between z-20">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full">
            <ChevronLeft color="#475569" size={24} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <View className="relative">
              <View className="w-10 h-10 rounded-full bg-teal-600 items-center justify-center shadow-md">
                <Text className="text-white font-bold text-sm">AI</Text>
              </View>
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </View>
            <View>
              <Text className="font-bold text-slate-900 text-sm">Doctor Patient Room AI</Text>
              <Text className="text-[10px] text-slate-500">Always Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <MoreVertical color="#94a3b8" size={20} />
        </TouchableOpacity>
      </View>

      {/* Emergency Banner */}
      <View className="bg-red-50 px-4 py-2 flex-row items-center justify-center gap-2 border-b border-red-100">
        <Activity color="#ef4444" size={14} />
        <Text className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Emergency? Dial 112 / 108</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          className="flex-1 px-4 pt-4"
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View className="items-center my-2">
            <View className="bg-slate-200/50 px-3 py-1 rounded-full">
              <Text className="text-[10px] font-bold text-slate-400">Today</Text>
            </View>
          </View>

          {messages.map((msg) => (
            <View key={msg.id} className={`flex-row mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <View className="w-6 h-6 rounded-full bg-teal-100 mr-2 mt-2 items-center justify-center">
                  <Text className="text-[10px] font-bold text-teal-700">AI</Text>
                </View>
              )}
              <View className={`max-w-[80%] p-3 px-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-slate-900 rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none'}`}>
                <Text className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-700'}`}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}

          {isTyping && (
            <View className="flex-row mb-4 justify-start">
              <View className="w-6 h-6 rounded-full bg-teal-100 mr-2 mt-2 items-center justify-center">
                <Text className="text-[10px] font-bold text-teal-700">AI</Text>
              </View>
              <View className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#0d9488" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="bg-white border-t border-slate-100 p-3 pb-6">
          <View className="flex-row items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type symptoms here..."
              placeholderTextColor="#94a3b8"
              className="flex-1 bg-transparent text-sm px-4 text-slate-800 h-10"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-full items-center justify-center shadow-md ${inputText.trim() ? 'bg-teal-600' : 'bg-slate-300'}`}
            >
              <Send color="white" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
