# TaskJoy

TaskJoy is a modern, gamified task management application designed to make productivity fun and engaging. Turn your to-do list into a game by earning points, leveling up, and unlocking achievements as you complete your tasks. Built with Next.js, React, and Tailwind CSS, it offers a clean, responsive, and intuitive user experience.

## ✨ Key Features

-   **Intuitive Task Management**: Easily add, edit, and delete tasks. Mark tasks as complete with a single click.
-   **Gamified Experience**: Earn points for every task you complete. Watch your total points grow and level up your profile.
-   **Achievement System**: Unlock special achievements for reaching milestones, such as completing your first task, mastering high-priority items, or clearing your entire list.
-   **Smart Point Assignment**: Powered by Google's Gemini AI through Genkit, TaskJoy automatically suggests a point value for your tasks based on their title, making the reward system fair and intelligent.
-   **Persistent Local Storage**: All your tasks and achievements are saved directly in your browser's local storage, ensuring your data is private and always available on your device.
-   **Sleek & Modern UI**: A beautiful and clean interface built with ShadCN UI components and styled with Tailwind CSS.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **UI Library**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **AI Integration**: [Genkit (Google's Generative AI Toolkit)](https://firebase.google.com/docs/genkit)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/get-npm)

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone https://your-repository-url.com
    cd your-project-directory
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/).
    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```

4.  **Run the development server:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI flows.

    -   In your first terminal, run the Next.js app:
        ```sh
        npm run dev
        ```

    -   In a second terminal, run the Genkit flows:
        ```sh
        npm run genkit:watch
        ```

5.  **Open the application:**
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
