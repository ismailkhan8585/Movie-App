import { Dimensions, StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress';
import React from 'react'
import { theme } from './theme/color';


const{width,height}=Dimensions.get('window')
const LoadingScreeen = () => {
  return (
    <View style={[styles.loadingstyle,{height,width}]}>
     <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}

export default LoadingScreeen

const styles = StyleSheet.create({
    loadingstyle:{
        position:'absolute',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})