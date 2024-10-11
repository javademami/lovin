// ChatScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const chatList = [
  { id: '1', name: 'Sarah', lastMessage: 'Hey, how are you?', avatar: 'https://images.pexels.com/photos/2744193/pexels-photo-2744193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', online: true },
  { id: '2', name: 'Mike', lastMessage: 'Want to meet up?', avatar: 'https://images.unsplash.com/photo-1665170338676-d30bc6e1f073?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', online: false },
  { id: '3', name: 'Emma', lastMessage: 'That sounds great!', avatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', online: true },
];

const messages = [
  { id: '1', text: 'Hey there!', sent: true },
  { id: '2', text: 'Hi! How are you?', sent: false },
  { id: '3', text: "I'm doing great, thanks for asking. How about you?", sent: true },  // اصلاح شده
  { id: '4', text: "I'm good too! Want to grab coffee sometime?", sent: false },  // اصلاح شده
  { id: '5', text: 'Sure, that sounds lovely!', sent: true },
];

export default function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => setSelectedChat(item)}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {!selectedChat ? (
        <FlatList
          data={chatList}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
        />
      ) : (
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.chatContainer}
        >
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)}>
              <Ionicons name="arrow-back" size={24} color="#FF69B4" />
            </TouchableOpacity>
            <Image source={{ uri: selectedChat.avatar }} style={styles.chatAvatar} />
            <Text style={styles.chatHeaderName}>{selectedChat.name}</Text>
          </View>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messageList}
            inverted
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="image" size={24} color="#FF69B4" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="Type a message..."
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy" size={24} color="#FF69B4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#FF69B4" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  chatInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  messageList: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF69B4',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  attachButton: {
    marginRight: 10,
  },
  emojiButton: {
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF69B4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
