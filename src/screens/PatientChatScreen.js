import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';

const PatientChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I am your AI Triage Assistant. I will help gather information about your symptoms before your consultation. Please describe what brings you in today.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'Thank you for sharing that. How long have you been experiencing these symptoms?',
        'I understand. Are you experiencing any pain? If so, on a scale of 1-10, how would you rate it?',
        'Got it. Do you have any known allergies or pre-existing medical conditions?',
        'Thank you for that information. Are you currently taking any medications?',
        'I have noted that. Have you noticed anything that makes your symptoms better or worse?',
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const generateReport = () => {
    Alert.alert(
      'Generate Preliminary Report',
      'Are you ready to generate your preliminary medical report? This will be reviewed by a doctor.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Generate',
          onPress: () => {
            setIsGeneratingReport(true);
            setTimeout(() => {
              const reportMessage = {
                id: (Date.now() + 2).toString(),
                text: '✅ Your preliminary report has been generated and sent to the doctor for review. You will be notified once it is approved.',
                sender: 'ai',
                timestamp: new Date(),
                isReport: true,
              };
              setMessages((prev) => [...prev, reportMessage]);
              setIsGeneratingReport(false);
            }, 2000);
          },
        },
      ]
    );
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    const isReport = item.isReport;

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.aiMessage,
        ]}
      >
        {!isUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isUser
              ? styles.userBubble
              : isReport
              ? styles.reportBubble
              : styles.aiBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.aiText,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        {isUser && (
          <View style={[styles.avatar, styles.userAvatar]}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            ⚠️ This is an AI assistant, not a doctor. For emergencies, call 911.
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={generateReport}
            disabled={isGeneratingReport}
          >
            <Text style={styles.reportButtonText}>
              {isGeneratingReport ? '⏳' : '📋'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Describe your symptoms..."
            placeholderTextColor={COLORS.gray}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  infoBanner: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FCD34D',
  },
  infoText: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.aiBubble,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    backgroundColor: COLORS.primary,
    marginRight: 0,
    marginLeft: 8,
  },
  avatarText: {
    fontSize: 18,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 14,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  reportBubble: {
    backgroundColor: COLORS.doctorBubble,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.white,
  },
  aiText: {
    color: COLORS.black,
  },
  timestamp: {
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  reportButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.doctorBubble,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reportButtonText: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.black,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  sendButtonText: {
    fontSize: 20,
    color: COLORS.white,
    marginLeft: 2,
  },
});

export default PatientChatScreen;
