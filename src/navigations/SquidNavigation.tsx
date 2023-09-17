import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LandingScreen,
  CreateAccountScreen,
  GreenLightRedLightScreen,
  LeadershipBoardScreen,
  ResultScreen,
} from "../index";

const Stack = createStackNavigator();

export const SquidNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"LandingScreen"}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
        <Stack.Screen
          name="GreenLightRedLightScreen"
          component={GreenLightRedLightScreen}
        />
        <Stack.Screen
          name="LeadershipBoardScreen"
          component={LeadershipBoardScreen}
        />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
