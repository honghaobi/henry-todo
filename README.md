# Henry's TODO List Application

This is a Single Page Application (SPA) built using React, TypeScript, and Cypress that allows users to manage their TODO list. The application enables users to add, edit, and remove tasks, as well as fetch initial tasks from a remote data source.

## Running the Application

To run this application locally, follow these steps:

1. **git clone <repository-url>**
1. **cd henry-todo**
1. **yarn install**
1. **yarn dev**


## Testing

To ensure comprehensive testing coverage for our compact application, we'll leverage component testing in lieu of traditional end-to-end testing. Since the app is compact, component testing will effectively serve as our end-to-end testing strategy. To execute component tests using Cypress, execute the following command:

**yarn cypress open**


## Application Architecture Overview

The application is structured using React components and TypeScript, following best practices in coding, state management, and application structure. Key components include:

- **App.tsx:** The main component managing the TODO list functionality.
- **Task.tsx:** Component representing an individual task.
- **services/taskService.ts:** Service for fetching tasks from a remote data source using React-Query.

## Using Suspense and React Query

The application utilizes React Suspense for lazy loading, along with React Query for managing API data fetching and caching. Suspense is employed to handle loading states and error boundaries for better user experience, while React Query simplifies data fetching and caching with its powerful features and integration with React Suspense.


## Styling with Shadcn UI and Tailwind CSS

The application utilizes Shadcn UI for consistent UI components and Tailwind CSS for styling and responsiveness.

## Deployed site link

henry-todo.surge.sh