import { View, StatusBar} from "react-native";
import { SquidNavigation } from "./src/navigations/SquidNavigation";
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={"#000"}
        barStyle={"light-content"}
      />
      <SquidNavigation />
    </View>
  );
}
