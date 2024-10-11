import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ logoSource, profileImageSource }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={logoSource} style={styles.logo} />
      <Image source={profileImageSource} style={styles.profileImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white', // Color of the header
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 40,  // Adjust the height as needed
    resizeMode: 'contain',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
