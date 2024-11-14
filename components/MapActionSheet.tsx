import ActionSheet, { SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import BuildingPage from "../components/BuildingPage";


export default function MapActionSheet(props: SheetProps<'mapaction-sheet'>) {
    
    if(!props.payload?.value) {
      return(<View></View>)
    } else {
      return (
        <ActionSheet
            indicatorStyle={{ backgroundColor: 'lightgray' }}
            headerAlwaysVisible={true}
            gestureEnabled
            enableGesturesInScrollView
            initialSnapIndex={0} 
            snapPoints={[100]} 
            >
              <BuildingPage {...props.payload?.value}></BuildingPage>
        </ActionSheet>
      )
    } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingTop: 70,
    },
    heading: {
      flex: 0,
      fontSize: 35,
      fontWeight: 'bold',
      color: '#7E2622',
      textAlign: "center",
      padding: 15
    },
    eventList: {
      flex: 0
    }    
  });
  