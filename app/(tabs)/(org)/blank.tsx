import { Text, View } from "react-native";

export default function Blank({ value } : {value: string}) {
    return (
        <View>
            

            <Text>{value}</Text>

        </View>
    );
}