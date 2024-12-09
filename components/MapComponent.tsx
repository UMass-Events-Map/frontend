import React, { useCallback, useMemo, useRef, useState, memo } from 'react';
import { Platform, Text, StyleSheet, View, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ActionSheet, { SheetManager, ActionSheetRef, useScrollHandlers } from 'react-native-actions-sheet';
import { BuildingProp, Building } from '@/constants/Interfaces'

import * as Location from 'expo-location';


const amherstRegion = { // Data to have map focus in on Amherst Area on load
    latitude: 42.390309,
    longitude: -72.527682,
    latitudeDelta: 0.012,
    longitudeDelta: 0.012,
}

export default function MapComponent({ buildings }: BuildingProp) {
    if (!buildings) return <Text>No buildings available</Text>;

    const handleMarkerPress = (building: Building) => {
        SheetManager.show('mapaction-sheet', {
            payload: { value: building },
          }
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={styles.map}
                region={amherstRegion}
                showsUserLocation
                showsMyLocationButton={true}
                showsCompass={true}
            >
                {buildings.map((building) => (
                    <Marker
                        key={building.id}
                        coordinate={{ latitude: building.latitude, longitude: building.longitude }}
                        onPress={() => handleMarkerPress(building)}
                        zIndex={9999999}
                    >
                        <Image style={styles.markerImage} source={require('../assets/icons/pin.png')} />
                    </Marker>
                ))}
                
            </MapView>
        
        </View>
    );
}

const resizedWidth = 30;
const resizedHeight = resizedWidth / 0.860;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
    markerImage: {
        width: resizedWidth,
        height: resizedHeight,
    },
});
