import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { slickHeight, slickFontSize, slickWidth } from "slick-sizer-ui";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ResultScreen = ({ navigation,route }) => {
  const result=route.params.result;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/GameBackground.png")}
        style={styles.bg}
      >
        <View style={{ height: slickHeight(20) }}>
          <Image
            source={require("../assets/images/SquidGameLogo1.png")}
            style={styles.logo}
          />

          <View style={{ height: slickHeight(80) }}>
            {result === "LOOSE" ? (
              <View style={styles.gameOver}>
                <Image
                  source={require("../assets/images/GAMEOVER.png")}
                  style={{ width: slickWidth(75), height: slickHeight(3.5) }}
                />
                <Pressable
                  style={{ flexDirection: "row", marginTop: slickHeight(10) }}
                  onPress={()=>{navigation.navigate("GreenLightRedLightScreen")}}
                >
                  <Ionicons name="reload" size={30} color="#D9D9D9" />
                  <Text style={styles.playAgainText}>Play Again</Text>
                </Pressable>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../assets/images/VICTORY.png")}
                  style={styles.victory}
                />
                <Pressable
                  onPress={()=>{navigation.navigate("LeadershipBoardScreen")}}
                >
                  <Text style={styles.leadershipText}>Leaderboard Board🥇</Text>
                </Pressable>

                <Image
                  source={require("../assets/images/VictoryReward.png")}
                  style={styles.reward}
                />

                <Pressable
                  style={{ flexDirection: "row", marginTop: slickHeight(10) }}
                  onPress={()=>{navigation.navigate("GreenLightRedLightScreen")}}
                >
                  <Ionicons name="reload" size={30} color="#D9D9D9" />
                  <Text style={styles.playAgainText}>Play Again</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  bg: {
    flex: 1,
  },
  logo: {
    height: slickHeight(16),
    width: slickWidth(50),
    alignSelf: "center",
  },
  gameOver: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: slickHeight(25),
  },
  playAgainText: {
    color: "#D9D9D9",
    fontSize: slickFontSize(6),
    marginLeft: slickWidth(3),
  },
  victory: {
    marginTop: slickHeight(7),
    width: slickWidth(65),
    height: slickHeight(4),
  },
  leadershipText: {
    color: "#D9D9D9",
    fontSize: slickFontSize(6),
    textAlign: "center",
    marginTop: slickHeight(4),
    textDecorationLine:'underline'
  },
  reward: {
    marginTop: slickHeight(5),
    width: slickWidth(65),
    height: slickHeight(35),
  },
});
