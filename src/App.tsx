import { useState } from "react";
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
  const [newTask, setNewTask] = useState<string>("");

  const sortedTasks = tasks.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? -1 : 1,
  );

  const handleAddNewTask = (newTask: string) => {
    if (newTask) {
      setTasks([
        ...tasks,
        {
          id: 100 + tasks.length,
          title: newTask,
          completed: false,
          userId: 3,
        },
      ]);
      setNewTask("");
    }
  };

  const handleUpdateTask = (taskId: number, value: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: value } : task,
      ),
    );
  };

  const handleRemoveTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleCompleteTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Henry's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <ul className="flex flex-col gap-2">
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
          </div>
          <form
            className="flex mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewTask(newTask);
            }}
          >
            <Input
              type="text"
              placeholder={NEW_TASK}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
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
