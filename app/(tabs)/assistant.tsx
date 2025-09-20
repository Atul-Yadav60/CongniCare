import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { GlassCard } from '../../components/ui/GlassCard';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AssistantScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant',
      text: 'Hello! I\'m your AI health assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);

  const quickActions = [
    {
      id: 'scanSkin',
      title: 'Scan Skin',
      icon: 'camera',
      color: colors.primary,
    },
    {
      id: 'checkDrug',
      title: 'Check Drug',
      icon: 'shield-checkmark',
      color: colors.secondary,
    },
    {
      id: 'findSpecialist',
      title: 'Find Specialist',
      icon: 'medical',
      color: colors.accent,
    },
    {
      id: 'myTrends',
      title: 'My Trends',
      icon: 'trending-up',
      color: colors.info,
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: 'I understand your concern. Let me help you with that. Would you like me to guide you to the appropriate health module?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: any) => {
    switch (action.id) {
      case 'scanSkin':
        router.push('/modules/skinAI');
        break;
      case 'checkDrug':
        router.push('/modules/trustMed');
        break;
      case 'findSpecialist':
        router.push('/modules/symptoCare');
        break;
      case 'myTrends':
        router.push('/health');
        break;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          AI Assistant
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Your personal health companion
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action)}
            >
              <GlassCard style={styles.quickActionContent}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  {action.title}
                </Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageContainer,
                msg.type === 'user' ? styles.userMessage : styles.assistantMessage,
              ]}
            >
                             <GlassCard style={[
                 styles.messageBubble,
                 msg.type === 'user' ? styles.userBubble : styles.assistantBubble,
               ] as any}>
                <Text style={[styles.messageText, { color: colors.text }]}>
                  {msg.text}
                </Text>
                <Text style={[styles.messageTime, { color: colors.onSurfaceVariant }]}>
                  {formatTime(msg.timestamp)}
                </Text>
              </GlassCard>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Input Area */}
      <View style={[styles.inputContainer, { borderTopColor: colors.cardBorder }]}>
        <View style={[styles.inputWrapper, { borderColor: colors.outline }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Ask me anything about your health..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
  },
  quickActionContent: {
    padding: 16,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
  },
  userBubble: {
    backgroundColor: 'rgba(46, 230, 214, 0.2)',
  },
  assistantBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
