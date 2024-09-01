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

  ```bash
  npm install -g expo-cli

## Screenshots

### Home Screen
![Home](https://github.com/user-attachments/assets/eff618ce-84d5-42aa-87fa-21e25961d8c2)

### Gropus
![Group1](https://github.com/user-attachments/assets/ede00564-3865-4e0e-9311-089888c03e86)

### Adding New Group
![New Group Added](https://github.com/user-attachments/assets/8b10d51e-3c34-4b54-afc4-5ed738cf20d9)

### Fresh Group
![New Group](https://github.com/user-attachments/assets/699a6584-023a-4e31-af06-5e7ee25ebc1b)

### Adding Todos
![Added Todos](https://github.com/user-attachments/assets/d83bc672-5427-4f99-a961-a7be2efc6079)

