Basic Task Manager (C# .NET 8 API + React TypeScript Frontend)

This project was built as part of an assignment to demonstrate full-stack development skills using C# (.NET 8) for the backend API and React/TypeScript for the frontend application.

🚀 Project Structure

The solution is split into two main directories:

TaskManager.Api: Contains the C# .NET 8 Web API, implementing a RESTful interface and using in-memory data storage.

TaskManager.Web: Contains the React + TypeScript single-page application (SPA).

✅ Functional Requirements Implemented

Display a list of tasks.

Add a new task with a description.

Toggle a task's completion status.

Delete a task.

✨ Enhancements Included

Task Filtering: Users can filter tasks by All, Active, and Completed statuses.

Local Storage Persistence: Tasks are synchronized with the browser's localStorage to ensure persistence across page refreshes, even though the backend is in-memory.

Basic Design: Custom CSS is used for a clean, user-friendly interface.

⚙️ How to Run Locally

Prerequisites

.NET 8 SDK

Node.js (LTS)

Git

1. Start the Backend API (C#)

Navigate to the TaskManager/TaskManager.Api folder and run:

dotnet run


The API should run on http://localhost:5021.

2. Start the Frontend Application (React)

Open a new terminal window, navigate to the TaskManager/TaskManager.Web folder, and run:

npm install 
npm run dev


The React app will open in your browser, typically at http://localhost:5173.

\
