import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const EditTodo = ({ id, setIsEditing, oldTodoTitle, getTodoListData }) => {
    const [ newTodoTitle, setNewTodoTitle ] = useState(oldTodoTitle);

    const db = useSQLiteContext();

    const updateTodo = async (id, newTitle) => {
        const result = await db.runAsync(`UPDATE Todo SET title = ? WHERE id = ?`, [newTitle, id]);
        return;
    }
    
    const handleEditTodo = async () => {
        if(newTodoTitle.length <= 0){
            alert("Todo length must not be zero !");
            return;
        }
        
        if(newTodoTitle !== oldTodoTitle){
            await updateTodo(id, newTodoTitle);
        }
        
        setIsEditing(false);
        await getTodoListData();
    }

    const cancelEdit = () => {
        setIsEditing(false);
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
            <TextInput
                style={{
                    backgroundColor: "#fff",
                    borderWidth: 0,
                    width: "60%",
                    
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    fontSize: 16,
                }}
                placeholder="Edit Todo"
                value={newTodoTitle}
                onChangeText={(text) => setNewTodoTitle(text)}
            />
            <TouchableOpacity style={{marginHorizontal: 8,backgroundColor: "#C80036", borderRadius: 8}}>
                <IconButton icon="close" iconColor="#fff" onPress={() => cancelEdit()}/>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "#fff", borderRadius: 8}}>
                <IconButton icon="check" iconColor="blue" onPress={() => handleEditTodo()}/>
            </TouchableOpacity>
        </View>
    )
}

export default EditTodo;