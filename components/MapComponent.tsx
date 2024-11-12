import React, { useCallback, useMemo, useRef, useState, memo } from 'react';
import { Platform, Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ActionSheet, { SheetManager, ActionSheetRef, useScrollHandlers } from 'react-native-actions-sheet';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

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
    const isUserInteraction = useRef(false);
    
    const handlers = useScrollHandlers();
    const actionSheetRef = useRef<ActionSheetRef>(null);

    
    //const snapPoints = useMemo(() => ['45%', '85%'], []);

    const handleMarkerPress = (building: Building) => {
        SheetManager.show('building-sheet', {
            payload: { value: building },
          }

        );

        // setSelectedLocation(building);
        // isUserInteraction.current = false;
        // actionSheetRef.current?.show();
    };

    const handleMapPress = () => {
        // actionSheetRef.current?.hide();
        // setSelectedLocation(null);
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
                // onRegionChange={handleRegionChange}
                // onRegionChangeComplete={handleRegionChangeComplete}
            >
                {buildings.map((building) => (
                    <Marker
                        key={building.id}
                        coordinate={{ latitude: building.latitude, longitude: building.longitude }}
                        //title={building.name}
                        
                        onPress={() => handleMarkerPress(building)}
                        
                        zIndex={9999999}
                    >
                        <Image style={styles.markerImage} source={require('../assets/icons/pin.png')} />
                    </Marker>
                ))}
                
            </MapView>

   
                {/* <ActionSheet ref={actionSheetRef} snapPoints={[400]}> */}
                    {/* <NativeViewGestureHandler simultaneousHandlers={handlers.simultaneousHandlers}> */}
                        
                        {/* <View style={styles.contentContainer}>
                            {selectedLocation ? (
                                <Text style={styles.title}>{selectedLocation.name}</Text>
                            ) : (
                                <Text style={styles.description}>Tap on a marker to see details</Text>
                            )}
                        </View> */}
        
                    {/* </NativeViewGestureHandler> */}
                {/* </ActionSheet> */}
        
        
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
