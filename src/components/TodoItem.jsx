import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const TodoItem = ({item, getTodoListData}) => {
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
    <View style={{
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
    }}>
        <Text style={{
            fontWeight: "700",
            fontSize: 18,
            color: "#fff",
            flex: 1,
        }}>{item.title}</Text>
        <IconButton icon="pencil" iconColor="#fff"/>
        <IconButton icon="trash-can" iconColor="#ff462e" onPress={() => handleDeleteTodo(item.id)}/>
    </View>
  )
}

export default TodoItem;

const styles = StyleSheet.create({})