import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';

interface Organization {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
  email?: string;
  address?: string;
  verified?: boolean;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description?: string;
  // Add other event fields as necessary
}

interface MainOrgPageProps {
  userId: string;
}

export default function MainOrgPage({ userId }: MainOrgPageProps) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;
        if (data && data.length > 0) {
          setOrganization(data[0]);
        } else {
          // No organizations found for the user
          setOrganization(null);
        }
      } catch (err: any) {
        console.error('Failed to fetch organizations:', err.message);
        Alert.alert('Error', 'Failed to fetch organizations');
      } finally {
        setLoadingOrg(false);
      }
    };

    fetchOrganizations();
  }, [userId]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!organization) {
        setLoadingEvents(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('organization_id', organization.id)
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (err: any) {
        console.error('Failed to fetch events:', err.message);
        Alert.alert('Error', 'Failed to fetch events');
      } finally {
        setLoadingEvents(false);
      }
    };

    if (organization) {
      fetchEvents();
    }
  }, [organization]);

  if (loadingOrg) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If no organization found
  if (!organization) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No organizations</Text>
        <Text style={styles.emptyDescription}>Get started by creating a new organization.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Organization Header Section */}
      <View style={styles.card}>
        {organization.image_url && (
          <Image
            source={{ uri: organization.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{organization.name}</Text>
          {organization.verified && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Verified</Text>
            </View>
          )}
        </View>

        {organization.description && (
          <Text style={styles.cardDescription}>{organization.description}</Text>
        )}

        <View style={styles.cardContent}>
          {organization.email && (
            <Text style={styles.cardDetail}>Email: {organization.email}</Text>
          )}
          {organization.address && (
            <Text style={styles.cardDetail}>Address: {organization.address}</Text>
          )}
          <Text style={styles.cardDetail}>Organization ID: {organization.id}</Text>
        </View>
      </View>

      {/* Add Event Button */}
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.addEventButton}
          onPress={() => router.push('/addEvent')}
        >
          <Text style={styles.addEventButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>

      {/* Events Section */}
      <Text style={styles.sectionTitle}>Events</Text>

      {loadingEvents ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No events found</Text>
          <Text style={styles.emptyDescription}>Create a new event to get started.</Text>
        </View>
      ) : (
        events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetails}>Date: {event.date}</Text>
            <Text style={styles.eventDetails}>Time: {event.time}</Text>
            {event.description && <Text style={styles.eventDetails}>{event.description}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push({ pathname: '/editEvent', params: { eventId: event.id } })}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              {/* You could also have a delete button here */}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyContainer: {
    padding: 20, justifyContent: 'center', alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 20, fontWeight: 'bold'
  },
  emptyDescription: {
    marginTop: 10, fontSize: 14, color: '#555', textAlign: 'center'
  },
  scrollContainer: {
    flex: 1, padding: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1, borderColor: '#ccc'
  },
  image: {
    width: '100%',
    height: 160
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1, borderColor: '#eee',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold'
  },
  badge: {
    backgroundColor: 'green', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4
  },
  badgeText: {
    color: '#fff', fontSize: 12
  },
  cardDescription: {
    padding: 16,
    fontSize: 14,
    color: '#333'
  },
  cardContent: {
    padding: 16
  },
  cardDetail: {
    fontSize: 14, color: '#555', marginBottom: 8
  },
  addEventButton: {
    backgroundColor: '#7E2622',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8
  },
  addEventButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center'
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1, borderColor: '#ccc',
    padding: 16
  },
  eventName: {
    fontSize: 16, fontWeight: 'bold', marginBottom: 8
  },
  eventDetails: {
    fontSize: 14, color: '#555', marginBottom: 4
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  editButtonText: {
    color: '#fff', fontWeight: '600'
  }
});
