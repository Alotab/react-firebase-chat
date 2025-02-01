# React Chat App with Firebase Authentication and File Sharing

A modern chat application built with React that leverages Firebase for user authentication and file storage. This app supports user-to-user chat functionality, the ability to add or block users, and efficient state management using Zustand.

## Features

- **User Authentication**: Firebase Authentication is used for secure user login and registration.
- **File Sharing**: Users can upload and share files with each other.
- **User Management**: Users can add or block other users within the app.
- **Real-Time Messaging**: Messaging happens in real time, thanks to Firebase's Firestore database.
- **State Management**: Zustand is used for managing the app's state in a simple and efficient manner.

## Technologies Used

- **React**: For building the user interface.
- **Firebase**: For authentication, real-time database (Firestore), and file storage (Firebase Storage).
- **Zustand**: For managing global state across the application.
- **JavaScript/ES6+**: Core language for building the application.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Alotab/react-firebase-chat.git
   cd react-firebase-chat
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project from the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication and Firestore.
   - Set up Firebase Storage for file uploads.
   - Create a `.env` file in the root directory with your Firebase project credentials:

     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the app**:

   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` in your browser to access the app.

## Usage

### Authentication

- Upon opening the app, users will be prompted to sign in using Firebase Authentication (Email/Password or other providers if enabled).
- Once authenticated, users can access the chat interface.

### Chatting

- Users can send and receive messages in real-time.
- They can also share files with other users in the chat.

### User Management

- Users can add or block other users. Blocked users will no longer be able to send messages or interact with the user who blocked them.

### File Sharing

- Users can upload files (images, documents, etc.) to Firebase Storage and share them within the chat interface.

## State Management

- Zustand is used for managing the app's state, including user authentication status, chat messages, and user lists.
- The app leverages Zustand’s simplicity to maintain a central store and make state management easy to scale as the app grows.



Feel free to tweak the details further or add more specific instructions depending on your project setup!