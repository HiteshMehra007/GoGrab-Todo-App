import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import TodoItem from '../components/TodoItem';
import TodoFallback from '../components/TodoFallback';

const TodoScreen = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const db = useSQLiteContext();

    // Handle Add Todo
    const handleAddTodo = async () => {
        try {
            if(todo.length === 0){
                alert("Please enter a valid todo !");
                return;
            }

            await db.runAsync(`INSERT INTO Todo (group_id, title, description) VALUES (?, ?, ?);`, [1, todo, todo]);
            
            // After adding, fetch the latest data
            getTodoListData();
            setTodo(""); // Reset input field only after the data has been updated
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const getTodoListData = async () => {
        try {
            const result = await db.getAllAsync(`SELECT * FROM Todo WHERE group_id = 1`);
            setTodoList(result);
        } catch (error) {
            console.error("Error fetching todo list:", error);
        }
    };

    useEffect(() => {
        // Initial fetch of todo list data
        const fetchData = async () => {
            try {
                await db.withTransactionAsync(async () => {
                    await getTodoListData();
                });
            } catch (error) {
                console.error("Error initializing todo list:", error);
            }
        };

        fetchData();
    }, [db]);

    return (
        <View style={{ marginHorizontal: 16, marginTop: 40 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>Work 🏢</Text>

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
            <FlatList
                data={todoList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TodoItem item={item} getTodoListData={getTodoListData} />}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
            {todoList.length === 0 && <TodoFallback />}
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
