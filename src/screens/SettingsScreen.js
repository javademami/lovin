import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const SettingItem = ({ icon, title, onPress, value, isSwitch }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon} size={24} color="#FF69B4" style={styles.icon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: "#767577", true: "#FF69B4" }}
          thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem icon="person-outline" title="Edit Profile" onPress={() => {}} />
        <SettingItem icon="lock-closed-outline" title="Change Password" onPress={() => {}} />
        <SettingItem icon="mail-outline" title="Email Preferences" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem
          icon="notifications-outline"
          title="Push Notifications"
          onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          value={notificationsEnabled}
          isSwitch
        />
        <SettingItem icon="volume-high-outline" title="Sound" onPress={() => {}} />
        <SettingItem icon="pulse-outline" title="Vibration" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <SettingItem icon="eye-off-outline" title="Profile Visibility" onPress={() => {}} />
        <SettingItem icon="location-outline" title="Location Services" onPress={() => {}} />
        <SettingItem icon="shield-checkmark-outline" title="Data Usage" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <SettingItem
          icon="moon-outline"
          title="Dark Mode"
          onPress={() => setDarkModeEnabled(!darkModeEnabled)}
          value={darkModeEnabled}
          isSwitch
        />
        <SettingItem icon="text-outline" title="Font Size" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingItem icon="help-circle-outline" title="Help Center" onPress={() => {}} />
        <SettingItem icon="chatbox-ellipses-outline" title="Contact Us" onPress={() => {}} />
        <SettingItem icon="star-outline" title="Rate the App" onPress={() => {}} />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteAccountButton}>
        <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  deleteAccountButtonText: {
    color: '#FF69B4',
    fontSize: 16,
  },
});