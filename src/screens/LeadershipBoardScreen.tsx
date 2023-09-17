import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { slickHeight, slickWidth, slickFontSize } from "slick-sizer-ui";
import Icon from "react-native-vector-icons/Ionicons";
import { PastResultCard } from "../index";
import { useSelector } from "react-redux";

export const LeadershipBoardScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [score, setScore] = useState({
    "LEVEL EASY": 0,
    "LEVEL MEDIUM": 0,
    "LEVEL HARD": 0,
  });

  useEffect(() => {
    if (user) {
      const newScore = user.previousRecords.reduce(
        (acc, record) => {
          const { level, score } = record;
          if (!acc[level] || score > acc[level]) {
            acc[level] = score;
          }
          return acc;
        },
        { ...score }
      );

      setScore(newScore);
    }
  }, [user]);

  return (
    <ImageBackground
      source={require("../assets/images/GameBackground.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={style.container}>
        <View style={style.profileContainer}>
          <Icon
            name="caret-back-outline"
            size={slickWidth(10)}
            color="#E5E5E5"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={style.profileDetailContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={style.personLogoStyle}>
                <Image
                  source={require("../assets/images/PersonIcon.png")}
                  style={{
                    height: slickHeight(16),
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  width: slickWidth(70),
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={style.keyBoldStyle}>Name : </Text>
                  <Text style={style.valueStyle}>{user.name.slice(0, 20)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: slickHeight(1),
                    alignItems: "center",
                  }}
                >
                  <Text style={style.keyBoldStyle}>Phone Number : </Text>
                  <Text style={style.valueStyle}>{user.mobileNumber}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: slickHeight(1),
                    alignItems: "center",
                  }}
                >
                  <Text style={style.keyBoldStyle}>Email : </Text>
                  <Text style={style.valueStyle}>
                    {user.email.slice(0, 20) + ".."}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={style.leaderBoardContainer}>
          <Text style={style.titleStyle}>Leadership Board :</Text>
          <View style={style.boardContainer}>
            <View
              style={{
                height: slickHeight(20),
                justifyContent: "center",
                alignItems: "center",
                width: slickWidth(25),
              }}
            >
              <Image
                source={require("../assets/images/achivementIocn.png")}
                style={{
                  height: slickHeight(18),
                  width: slickWidth(20),
                  resizeMode: "contain",
                }}
              />
            </View>
            <View
              style={{
                width: slickWidth(60),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={[style.titleStyle]}>Highest Score</Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: slickWidth(55),
                    justifyContent: "space-around",
                    marginTop: slickHeight(2),
                  }}
                >
                  <Text style={style.keyBoldStyle}>Levels:</Text>
                  <Text style={style.keyBoldStyle}> Easy</Text>
                  <Text style={style.keyBoldStyle}>Medium</Text>
                  <Text style={style.keyBoldStyle}>Hard</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: slickWidth(55),
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={style.keyBoldStyle}>Score:</Text>
                  <Text style={style.valueStyle}>{score["LEVEL EASY"]}.00</Text>
                  <Text style={style.valueStyle}>
                    {score["LEVEL MEDIUM"]}.00
                  </Text>
                  <Text style={style.valueStyle}>{score["LEVEL HARD"]}.00</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={style.pastPlayContainer}>
          <Text style={style.titleStyle}>Recent Scores :</Text>
          <View style={{ marginTop: slickHeight(1) }}>
            <FlatList 
            data={user.previousRecords.slice(-5).reverse()}
            renderItem={({ item,index }) => (
              <PastResultCard data={item}/>
            )}
            showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={style.squadContainer}>
          <Image
            source={require("../assets/images/SquidImage.png")}
            style={{
              height: slickHeight(20),
              resizeMode: "cover",
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    height: slickHeight(100),
    width: slickWidth(100),
    alignItems: "center",
  },
  profileContainer: {
    height: slickHeight(25),
    width: slickWidth(90),
  },
  leaderBoardContainer: {
    height: slickHeight(25),
    width: slickWidth(90),
  },
  pastPlayContainer: {
    height: slickHeight(40),
    width: slickWidth(90),
  },
  squadContainer: {
    height: slickHeight(10),
    width: slickWidth(100),
    justifyContent: "center",
    alignItems: "center",
  },
  profileDetailContainer: {
    width: slickWidth(85),
    alignSelf: "center",
    height: slickHeight(18),
    borderRadius: slickWidth(5),
    borderColor: "#fff",
    borderWidth: slickWidth(0.5),
  },
  personLogoStyle: {
    height: slickHeight(18),
    justifyContent: "center",
    width: slickWidth(20),
  },
  keyBoldStyle: {
    fontSize: slickFontSize(4),
    color: "#fff",
    fontWeight: "bold",
  },
  valueStyle: {
    fontSize: slickFontSize(3.6),
    color: "#fff",
  },
  titleStyle: {
    fontSize: slickFontSize(4.5),
    margin: slickHeight(0.5),
    marginLeft: slickWidth(3),
    color: "#fff",
    fontWeight: "bold",
  },
  boardContainer: {
    height: slickHeight(20),
    width: slickWidth(85),
    borderRadius: slickWidth(5),
    borderColor: "#fff",
    borderWidth: slickWidth(0.5),
    alignSelf: "center",
    flexDirection: "row",
  },
});
