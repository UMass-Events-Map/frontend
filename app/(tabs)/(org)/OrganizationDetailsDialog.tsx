/*import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from '@/utils/supabase'; 

interface OrganizationDetailsDialogProps {
  organizationId: string;
  visible: boolean;    // Control modal visibility from parent
  onClose: () => void;
}

export function OrganizationDetailsDialog({ organizationId, visible, onClose }: OrganizationDetailsDialogProps) {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);;
  

  useEffect(() => {
    if (visible) {
      fetchDetails();
    }
  }, [organizationId, visible]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const response = await fetch('https://umaps.phoenixfi.app/organization/${organizationId}/details', {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

    } catch (error: any) {
      console.error('Failed to fetch organization details:', error);
    } finally {
      setLoading(false);
    }
  };



  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {details && (
              <ScrollView>
                <Text style={styles.title}>{details.name}</Text>
                <Text style={styles.description}>{details.description}</Text>

                {isAdmin && (
                  <View>
                    <Text style={styles.subtitle}>Add a Member</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Search by email"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      onSubmitEditing={handleSearchProfiles}
                    />
                    {searchResults.map((profile) => (
                      <View key={profile.id} style={styles.resultItem}>
                        <Text>{profile.email}</Text>
                        <Button title="Add" onPress={() => addMember(profile.id)} />
                      </View>
                    ))}
                  </View>
                )}

                <Text style={styles.subtitle}>Members</Text>
                {members.length === 0 ? (
                  <Text>No members found.</Text>
                ) : (
                  members.map((member: any) => (
                    <Text key={member.profile.id}>{member.profile.email} - {member.role}</Text>
                  ))
                )}

                {/* Similar logic for events (details.events) can be shown here }
              </ScrollView>
            )}
            <Button title="Close" onPress={onClose} />
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  description: { marginBottom: 20 },
  subtitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  resultItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
});
*/