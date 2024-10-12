// screens/HomeScreen.js
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import { useGroup } from '../context/GroupProvider';

import { List, FAB } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const { groups, getGroups, refreshGroups } = useGroup();
  // const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  const db = useSQLiteContext();

  // const getGroups = async () => {
  //   const result = await db.getAllAsync(`SELECT * FROM Groups`);
  //   setGroups(result);
  // }

  const addGroup = async (groupName) => {
    try {
        await db.runAsync(`INSERT INTO groups (name) VALUES (?);'`, [groupName]);
        await getGroups();
    } catch (error) {
        console.log("Error while adding new group:\n", error);
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  const handleAddGroup = () => {
    if (groupName.length > 0) {
        addGroup(groupName);
        setGroupName('');
    }
  };

  // const refreshGroups = () => {
  //   getGroups(); // Fetch latest data from database
  // }

  return (
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          placeholder="New Group Name"
          value={groupName}
          onChangeText={setGroupName}
          style={{ marginBottom: 10 }}
        />
        <Button title="Add Group" onPress={handleAddGroup} />
        <FAB style={{ position: 'absolute', right: 20, bottom: 20 }} icon="plus" onPress={handleAddGroup} />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            // refreshGroups= {refreshGroups}
            onPress={() => navigation.navigate('TodoScreen', {
                groupId: item.id, 
              } 
            )}
          />
        )}
      />
    </View>
  );
}
