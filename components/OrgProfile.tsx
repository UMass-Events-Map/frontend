import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function OrgProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Events</Text>
          <MaterialCommunityIcons name="power-plug" size={24} color="#34C759" />
        </View>
      </View>

      <View style={styles.eventsContainer}>
        <View style={styles.event}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.eventImage}
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTime}>10:00 AM, Mar 12</Text>
            <Text style={styles.eventName}>Annual Company Conference</Text>
            <Text style={styles.eventDescription}>Keynote speakers and networking.</Text>
          </View>
        </View>

        <View style={styles.event}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.eventImage}
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTime}>2:00 PM, Apr 15</Text>
            <Text style={styles.eventName}>Team Building Workshop</Text>
            <Text style={styles.eventDescription}>Collaborative problem-solving activities.</Text>
          </View>
        </View>

        <View style={styles.event}>
          <Image
            source={{ uri: 'https://thevendry.com/cdn-cgi/image/width=640,quality=75,fit=contain,metadata=none,format=auto/https%3A%2F%2Fs3.amazonaws.com%2Fuploads.thevendry.co%2F24985%2F1665157263579_52126829973_d809692f7a_o-%25281%2529.jpg' }}
            style={styles.eventImage}
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTime}>6:00 PM, May 20</Text>
            <Text style={styles.eventName}>Summer Kickoff Party</Text>
            <Text style={styles.eventDescription}>Food, drinks, and music.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  titleContainer: {
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventsContainer: {
    marginTop: 20,
  },
  event: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  eventImage: {
    width: 70,
    height: 70,
  },
  eventInfo: {
    marginLeft: 15,
  },
  eventTime: {
    fontSize: 16,
    color: '#666',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#999',
  },
});
