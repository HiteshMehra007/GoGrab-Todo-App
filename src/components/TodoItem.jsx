import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import EditTodo from './EditTodo';

const TodoItem = ({item, getTodoListData}) => {
  const [ isEditing, setIsEditing ] = useState(false);
  const db = useSQLiteContext();

  const deleteTodoItem = async (id) => {
    const res = await db.runAsync(`DELETE FROM Todo WHERE id = ?;`, [id]);
  }

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodoItem(id);
      await getTodoListData();

    } catch (error) {
      console.log("Error while Deleting Todo:\n", error);
    }
  }

  return (
    <View>
      {
        !isEditing ? (
          <View style={
            {
              borderRadius: 8,
              backgroundColor: "#1e90ff",
              marginBottom: 24,
              paddingVertical: 8,
              paddingHorizontal: 8,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 1
          }
          }>
            <Text style={{
              fontWeight: "700",
              fontSize: 18,
              color: "#fff",
              flex: 1,
            }}>{item.title}</Text>
            <IconButton icon="pencil" iconColor="#fff" onPress={() => setIsEditing((prev) => !prev)}/>
            <IconButton icon="trash-can" iconColor="#ff462e" onPress={() => handleDeleteTodo(item.id)}/>
        </View>
        ): 
        (
          <EditTodo id={item.id} setIsEditing={setIsEditing} oldTodoTitle={item.title} getTodoListData={getTodoListData}/>
        )
      }
      
    </View>
  )
}

export default TodoItem;

const styles = StyleSheet.create({})