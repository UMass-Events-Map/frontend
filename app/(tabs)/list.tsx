import { Text, View, StyleSheet } from "react-native";
import EventList from "@/components/EventList";

export default function List() {
  return (
    <View style={styles.container}>
    
      <Text style={styles.heading}>EVENT LIST</Text>
      <EventList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70,
  },
  heading: {
    flex: 1,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#7E2622'
  }
});
