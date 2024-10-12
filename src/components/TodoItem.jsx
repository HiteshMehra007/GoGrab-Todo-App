import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Checkbox } from 'react-native-paper';

import EditTodo from './EditTodo';

const TodoItem = ({item, getTodoListData}) => {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isCompleted, setIsCompleted ] = useState(() => {
    return (item.status === "completed") ? true: false;
  });

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

  const handleCompleteTodo = async (id) => {
    try {
      let currState = (item.status === "pending") ? "completed" : "pending";

      await db.runAsync(`UPDATE Todo SET status = ? WHERE id = ?;`, [currState, id]);
      await getTodoListData();
      setIsCompleted((prev) => !prev);
    } catch (error) {
      console.log("Error while Updating Completed Todo:\n", error);
    }
  }

  return (
    <View>
      {
        !isEditing ? (
          <View style={[
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
          },
          isCompleted && styles.checkedView,
          ]}>
            <Checkbox 
              status={isCompleted ? 'checked': 'unchecked'}
              onPress={() => handleCompleteTodo(item.id)}
            />
            <Text style={[{
              marginLeft: 8,
              fontWeight: "700",
              fontSize: 18,
              color: "#fff",
              flex: 1,
            },
            isCompleted && styles.checkedText,
            ]}>{item.title}</Text>
            {
              !isCompleted && <IconButton icon="pencil" iconColor="#fff" onPress={() => setIsEditing((prev) => !prev)}/>
            }
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

const styles = StyleSheet.create({
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  checkedView: {
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: 2,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
})