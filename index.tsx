import registerRootComponent from "expo/build/launch/registerRootComponent";
import { Provider } from "react-redux";
import {LogBox} from "react-native"
import { store } from "./src/redux_toolkit/store/store";
import App from "./App";

LogBox.ignoreLogs(["Require cycle:"])
const AppWithRedux = () => (
  // wrapping app with provider
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(AppWithRedux);
