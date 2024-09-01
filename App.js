import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Items, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';


import TodoScreen from './src/screens/TodoScreen';
import HomeScreen from './src/screens/HomeScreen';

// Initialize database
async function initilizeDatabase(db){
  // const db = await SQLite.openDatabaseAsync('todoAppDB.db');
  try {
    db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );
      CREATE TABLE IF NOT EXISTS Todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT CHECK(status IN ('pending', 'completed')) NOT NULL DEFAULT 'pending',
        FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE
      );
      `)
  } catch (error) {
    console.error("Error while initializing the database:\n", error);
  }
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <SQLite.SQLiteProvider databaseName='todoAppDB.db' onInit={initilizeDatabase}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen 
            name='TodoScreen' 
            component={TodoScreen}
            options={{
              headerTitle: "Todo App",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLite.SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});
