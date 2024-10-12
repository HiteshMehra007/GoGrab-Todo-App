import React, { createContext, useContext, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const db = useSQLiteContext();

  const getGroups = async () => {
    const result = await db.getAllAsync(`SELECT * FROM Groups`);
    setGroups(result);
  }

  const refreshGroups = () => {
    getGroups();
  };

  return (
    <GroupContext.Provider value={{ groups, getGroups, refreshGroups }}>
      {children}
    </GroupContext.Provider>
  );
};
