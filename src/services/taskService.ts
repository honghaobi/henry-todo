import { TaskType } from "@/Task";
import { useSuspenseQuery } from "@tanstack/react-query";

const TASKS_API_ENDPOINT = "https://jsonplaceholder.typicode.com/todos";

async function fetchTasks() {
  const response = await fetch(TASKS_API_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = await response.json();

  const filteredTasks = tasks
    .filter((task: TaskType) => task.userId === 3)
    .slice(0, 5);

  return filteredTasks;
}

export function useGetTasksQuery() {
  return useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}
