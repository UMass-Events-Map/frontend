import React, { useCallback, useMemo, useRef, useState, memo } from 'react';
import { Platform, Text, StyleSheet, View, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

type Building = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

type BuildingProp = {
    buildings: Building[] | null;
};

export default function MapComponent({ buildings }: BuildingProp) {
    if (!buildings) return <Text>No buildings available</Text>;

    const [selectedLocation, setSelectedLocation] = useState<Building | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const isUserInteraction = useRef(false);

    const snapPoints = useMemo(() => ['45%', '85%'], []);

    const handleMarkerPress = (building: Building) => {
        setSelectedLocation(building);
        isUserInteraction.current = false;
        bottomSheetRef.current?.snapToIndex(1);
    };

    const handleMapPress = () => {
        bottomSheetRef.current?.snapToIndex(0);
        setSelectedLocation(null);
    };

    const handleRegionChange = () => {
        if (isUserInteraction.current) {
            bottomSheetRef.current?.snapToIndex(0);
            setSelectedLocation(null);
        }
    };

    const handleRegionChangeComplete = () => {
        isUserInteraction.current = true;
    };


    return (
        <View style={styles.container}>
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={styles.map}
                region={{
                    latitude: 42.390309,
                    longitude: -72.527682,
                    latitudeDelta: 0.012,
                    longitudeDelta: 0.012,
                }}
                onPress={handleMapPress}
                onRegionChange={handleRegionChange}
                onRegionChangeComplete={handleRegionChangeComplete}
            >
                {buildings.map((building) => (
                    <Marker
                        key={building.id}
                        coordinate={{ latitude: building.latitude, longitude: building.longitude }}
                        //title={building.name}
                        onPress={() => handleMarkerPress(building)}
                        tracksViewChanges={false}
                        zIndex={9999999}
                    >
                        <Image style={styles.markerImage} source={require('../assets/icons/pin.png')} />
                    </Marker>
                ))}
            </MapView>

            <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
                <BottomSheetView>
                    <View style={styles.contentContainer}>
                        {selectedLocation ? (
                            <Text style={styles.title}>{selectedLocation.name}</Text>
                        ) : (
                            <Text style={styles.description}>Tap on a marker to see details</Text>
                        )}
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}

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
        width: 39,
        height: 45.3,
    },
});
