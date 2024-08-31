import React from 'react';
import { StyleSheet, View, Image } from 'react-native'

const TodoFallback = () => {
  return (
    <View style={{alignItems: "center"}}>
      <Image source={require("../../assets/todo-list.png")} 
        style={styles.imageStyle}
      />
    </View>
  )
}

export default TodoFallback;

const styles = StyleSheet.create({
    imageStyle: {
        height: 300,
        width: 300,
        marginRight: 30
    }
})