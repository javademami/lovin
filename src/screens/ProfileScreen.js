import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const userProfile = {
  name: 'Sarah Johnson',
  age: 28,
  location: 'New York, NY',
  bio: "Adventure seeker, coffee lover, and aspiring chef. Looking for someone to share life's exciting moments with!", // اصلاح شده
  interests: ['Travel', 'Cooking', 'Photography', 'Hiking'],
  photos: [
    'https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/17580288/pexels-photo-17580288/free-photo-of-a-woman-with-freckles-and-a-black-top.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/17580297/pexels-photo-17580297/free-photo-of-a-woman-with-tattoos-posing-for-a-black-and-white-photo.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/10648948/pexels-photo-10648948.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/11966579/pexels-photo-11966579.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  ],
};

export default function UserProfileScreen() {
  const renderPhotoItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.galleryPhoto} />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userProfile.photos[0] }} style={styles.profilePhoto} />
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.name}>{userProfile.name}, {userProfile.age}</Text>
        <Text style={styles.location}>{userProfile.location}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bio}>{userProfile.bio}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {userProfile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <FlatList
          data={userProfile.photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble" size={24} color="white" style={styles.messageIcon} />
        <Text style={styles.messageButtonText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF69B4',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#FFB6C1',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#FF1493',
  },
  galleryPhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  messageButton: {
    backgroundColor: '#FF69B4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    margin: 20,
  },
  messageIcon: {
    marginRight: 10,
  },
  messageButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
