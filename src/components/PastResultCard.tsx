import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { slickHeight, slickWidth, slickFontSize } from "slick-sizer-ui";

export const PastResultCard = ({data}) => {
  return (
    <View style={style.container}>
      <View style={{width:slickWidth(30), justifyContent:'center',alignItems:'center'}}>
        <Text style={style.headingStyle}>{data.result}</Text>
      </View>
      <View style={{width:slickWidth(50), alignItems:'flex-end', justifyContent:'center'}}>
        <Text style={style.scoreTextStyle}>{data.level}</Text>
        <Text style={style.scoreTextStyle}>Score : {data.score}</Text>
      </View>
    </View>
  )
}

const style=StyleSheet.create({
    container:{
        height:slickHeight(10),
        width:slickWidth(85),
        borderRadius:slickWidth(5),
        borderColor:"#fff",
        marginTop:slickHeight(1),
        borderWidth:slickWidth(1),
        alignSelf:'center',
        flexDirection:'row',
        backgroundColor:"#8A8A8A"
    },
    headingStyle:{
        fontSize:slickFontSize(8),
        fontWeight:'bold',
        color:'#fff'
    },
    scoreTextStyle:{
        fontSize:slickFontSize(4),
        fontWeight:'900',
        color:'#fff'
    }
})
