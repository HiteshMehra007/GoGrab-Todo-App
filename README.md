# GoGrab TODO App

This is a simple TODO application developed using **React Native** with **Expo** and **SQLite**. The app allows users to manage their tasks by organizing them into groups, adding detailed descriptions, and marking tasks as completed or pending.

## Features

- **Group Management**: Users can create, view, and manage different groups (categories) to organize their tasks.
- **Task Management**:
  - Create and manage TODO items within each group.
  - Each TODO item has a title and description.
  - Tasks can be marked as completed or pending.
  - Users can edit or delete tasks.
- **Data Persistence**: All data is stored locally using SQLite, ensuring persistent data storage even when the app is closed.

## Screens

1. **Home Screen**: Displays all task groups. Users can add new groups and navigate to the group's TODO list.
2. **Todo List Screen**: Lists all tasks within a selected group. Tasks can be marked as completed or deleted.
3. **Task Detail Screen**: Provides detailed information about a task, with options to edit, delete, or change its completion status.
4. **Task Creation Screen**: A form for adding new tasks or editing existing ones.

## Project Structure

- **App.js**: The main file that sets up navigation and initializes the SQLite database.
- **TodoAppDB.js**: Contains functions for interacting with the SQLite database, including creating tables, adding, retrieving, updating, and deleting tasks and groups.
- **screens/**: Contains all screen components for the app:
  - **HomeScreen.js**: Manages the group list and navigation to the TODO lists.
  - **TodoListScreen.js**: Displays tasks within a selected group.
  - **TaskDetailScreen.js**: Shows detailed information about a specific task.
  - **TaskCreationScreen.js**: Allows users to create or edit a task.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Expo CLI** installed globally via npm:

## Screenshots

https://drive.google.com/file/d/1B2rvBcHQ8eSMRA9cF22vvmBvqTya_Ii6/view?usp=sharing

https://drive.google.com/file/d/1B3caMD8BDi3QqzuyudRm-6PejruWYWQ5/view?usp=sharing

  ```bash
  npm install -g expo-cli
