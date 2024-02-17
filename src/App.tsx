import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Task, { TaskType } from "./Task";
import { useGetTasksQuery } from "./services/taskService";

const NEW_TASK = "Type up a new task";

function App() {
  const { data } = useGetTasksQuery();
  const [tasks, setTasks] = useState<TaskType[]>(data);
  const newTaskRef = useRef<HTMLInputElement>(null);

  const sortedTasks = tasks
    .slice()
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));

  const handleAddNewTask = () => {
    const newTaskValue = newTaskRef.current?.value;
    if (newTaskValue) {
      const newTasks = [
        ...tasks,
        {
          id: 100 + tasks.length,
          title: newTaskValue,
          completed: false,
          userId: 3,
        },
      ];
      setTasks(newTasks);
      newTaskRef.current!.value = "";
    }
  };

  const handleUpdateTask = (taskId: number, value: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleCompleteTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Henry's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 max-h-[70vh] overflow-scroll">
            {sortedTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                completed={task.completed}
                removeTask={handleRemoveTask}
                updateTask={handleUpdateTask}
                toggleCompleteTask={handleToggleCompleteTask}
              />
            ))}
          </ul>
          <form
            className="flex mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewTask();
            }}
          >
            <Input
              type="text"
              placeholder={NEW_TASK}
              ref={newTaskRef}
            />
            <Button variant="outline" type="submit" aria-label="Add Task">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
