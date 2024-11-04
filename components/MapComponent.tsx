import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, Text, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // (react native maps library doesnt support web loading/viewing)
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GOOGLE_MAPS_API_KEY } from '@env';

type Building = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};
  
type BuildingListProps = {
    buildings: Building[] | null;
};

export default function MapComponent({ buildings }: BuildingListProps) {
    const [selectedLocation, setSelectedLocation] = useState<Building | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handleMarkerPress = (building: Building) => {
        
        console.log("Marker pressed:", building); 

        setSelectedLocation(building);
        
        if (bottomSheetRef.current) {
            console.log("Expanding bottom sheet...");
            bottomSheetRef.current.expand();
        } else {
            console.log("Bottom sheet ref is not set");
        }

    };
    
    // Web Expo testing will not work, you must launch Emulator/Simulator or Connect Physical Device
    if (!buildings) { return <Text>No buildings available</Text>; }
  
    return (
        <View style={styles.container}>
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined }
                style={styles.map}
                region={{
                    latitude: 42.390309,
                    longitude: -72.527682,
                    latitudeDelta: 0.012,
                    longitudeDelta: 0.012,
                }}
            >
                {buildings.map(building => ( 
                    <Marker
                        key={building.id}
                        coordinate={{ latitude: building.latitude, longitude: building.longitude }}
                        title={building.name}
                        description="Marker Description"
                        onPress={() => handleMarkerPress(building)}
                    />

                ))}

            </MapView>
            
            <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
                <BottomSheetView>
                    <View style={styles.contentContainer}>
                        {selectedLocation ? (
                            <>
                            <Text style={styles.title}>{selectedLocation.name} </Text>
                            </>
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
});