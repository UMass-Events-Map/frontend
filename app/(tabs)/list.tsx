import { Text, View } from "react-native";

export default function List() {
  const [events, setEvents] = useState<any[] | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*');
      setEvents(data);
    };
    fetchEvents();

    console.log(events)
  
  }, []);



  return (
    <View style={styles.container}>
    
      <Text> LIST VIEW</Text>
    
    
    
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
    flex: 0,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#7E2622',
    marginBottom: 15
  },
  eventList: {
    flex: 0
  }
});
