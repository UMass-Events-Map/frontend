import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, Text, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // (react native maps library doesnt support web loading/viewing)
import BottomSheet from '@gorhom/bottom-sheet';
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
    
    // If using web view to test viewing the map it won't work, you must launch Emulator or Connect Physical Device
    if (!buildings) {
        return <Text>No buildings available</Text>;
    }
  
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
                <View style={styles.contentContainer}>
                {selectedLocation ? (
                    <>
                    <Text style={styles.title}>{selectedLocation.name}</Text>

                    {/* <Text style={styles.description}>{selectedLocation.description}</Text> */}
                    
                    </>
                ) : (
                    <Text style={styles.description}>Tap on a marker to see details</Text>
                )}
                </View>
            </BottomSheet>
            
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
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