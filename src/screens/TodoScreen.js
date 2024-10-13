import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { IconButton } from 'react-native-paper';
import { useGroup } from '../context/GroupProvider';
import { Picker } from '@react-native-picker/picker';

import TodoItem from '../components/TodoItem';
import TodoFallback from '../components/TodoFallback';

const TodoScreen = ({route, navigation}) => {
    const { groupId } = route.params;
    const { refreshGroups } = useGroup();

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [groupName, setGroupName] = useState('');

    const db = useSQLiteContext();

    // Handle Add Todo
    const handleAddTodo = async () => {
        try {
            if(todo.length === 0){
                alert("Please enter a valid todo !");
                return;
            }

            await db.runAsync(`INSERT INTO Todo (group_id, title, description) VALUES (?, ?, ?);`, [groupId, todo, todo]);
            
            // After adding, fetch the latest data
            getTodoListData();
            setTodo(""); // Reset input field only after the data has been updated
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const getTodoListData = async () => {
        try {
            const result = await db.getAllAsync(`SELECT * FROM Todo WHERE group_id = ?`, [groupId]);
            setTodoList(result);
        } catch (error) {
            console.error("Error fetching todo list:", error);
        }
    };

    const deleteGroup = async (id) => {
        try {
            await db.runAsync(`DELETE FROM Todo WHERE group_id = ?`, [id]);
            await db.runAsync(`DELETE FROM Groups WHERE id = ?;`, [id]);
            refreshGroups();
            navigation.goBack();
        } catch (error) {
            console.log("Error while deleting Group: \n", error);
        }
    }

    useEffect(() => {
        // Initial fetch of todo list data
        const fetchData = async () => {
            try {
                await db.withTransactionAsync(async () => {
                    await getTodoListData();
                    await getGroupName();
                });
            } catch (error) {
                console.error("Error initializing todo list:", error);
            }
        };

        fetchData();
    }, [db]);

    const getGroupName = async () => {
        try{
            const result = await db.getFirstAsync(`SELECT name FROM Groups WHERE id = ?;`, [groupId]);
            if (result) {
                setGroupName(result.name);
            } else {
                setGroupName("Unknown Group");
            }
        }
        catch(error){
            console.log('Error while getting group name: \n', error);
        }
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 16, marginTop: 40 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>{groupName}</Text>
                <TouchableOpacity style={{paddingHorizontal: 4, paddingVertical: 2, backgroundColor: "#C80036", borderRadius: 8}}>
                <IconButton icon="trash-can" iconColor="#fff" onPress={() => deleteGroup(groupId)} />
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Add a Todo"
                value={todo}
                onChangeText={(text) => setTodo(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {/* Render Todos */}
            {todoList.length === 0 && <TodoFallback />}
            <FlatList
                data={todoList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TodoItem item={item} getTodoListData={getTodoListData} />}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    input: {
        borderColor: "#1e90ff",
        borderWidth: 2,
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#000",
        borderRadius: 8,
        paddingVertical: 14,
        marginTop: 20,
        marginBottom: 34,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
    },
});
