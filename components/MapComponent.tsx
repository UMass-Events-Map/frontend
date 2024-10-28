import React from 'react';
import { Platform, Text, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // (react native maps library doesnt support web loading/viewing)
// import { GOOGLE_MAPS_API_KEY } from '@env';

export default function MapComponent() {
    // If using web view to test viewing the map it won't work, you must launch Emulator or Connect Physical Device

    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined }
                style={StyleSheet.absoluteFill}
                region={{
                    latitude: 42.390309,
                    longitude: -72.527682,
                    latitudeDelta: 0.012,
                    longitudeDelta: 0.012,
                }}
            >
                <Marker
                coordinate={{ latitude: 42.390309, longitude: -72.527682 }}
                title="Marker Title"
                description="Marker Description"
                />
            </MapView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});