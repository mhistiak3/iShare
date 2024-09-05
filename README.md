# iShare - File Sharing Application

## Description

iShare is a real-time file-sharing web application that allows users connected to the same Wi-Fi network to upload and share files seamlessly. Built with Node.js, Express.js, and Socket.io, it provides a responsive and interactive experience where users can upload files and see them available for download by others in real time.

## Features

- **Real-Time File Sharing**: Upload and share files instantly with other users on the same network using Socket.io.
- **Drag & Drop Upload**: Users can drag and drop files or browse their device for file selection.
- **Responsive Design**: Mobile-friendly interface ensures usability on various devices.
- **Live File List**: Files uploaded by any user are immediately visible to all connected users.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the backend.
- **Socket.io**: Real-time communication library for handling live file sharing.
- **JavaScript**: Client-side scripting to manage file uploads and interactions.
- **Tailwind CSS**: Styling framework for responsive design.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ishare.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd ishare
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` by default.

5. **Open the Application**
   - Open `http://localhost:3000` in a web browser to access the application.

## Usage

1. **Upload Files**: Drag and drop files into the dropzone or click to browse and select files.
2. **View Files**: Uploaded files will appear in the list, and other users connected to the same network will see these files in real time.
3. **Download Files**: Click the "Download" button next to a file to download it (functionality needs to be implemented).

## Development

- **File Upload Handling**: Implement file upload routes and storage on the server.
- **Real-Time Updates**: Use Socket.io to push updates to all connected clients when files are uploaded.
- **File Management**: Add functionality for downloading and managing uploaded files.
