import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type TaskType = {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
};

const Task = ({
  id,
  title,
  completed,
  removeTask,
  updateTask,
  toggleCompleteTask,
}: TaskType & {
  removeTask: (id: number) => void;
  updateTask: (id: number, value: string) => void;
  toggleCompleteTask: (id: number) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleUpdate = () => {
    if (editValue.trim() !== "") {
      updateTask(id, editValue.trim());
      setIsEdit(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" && handleUpdate();

  return (
    <li className="flex items-center justify-between max-w-[500px]">
      <div className="flex-1 min-w-[300px]">
        {isEdit ? (
          <Input
            className="h-8"
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div
            className="w-[330px] cursor-pointer"
            onClick={() => toggleCompleteTask(id)}
          >
            {completed ? (
              <FontAwesomeIcon icon={faCheck} className="mr-4" />
            ) : null}
            {title}
          </div>
        )}
      </div>
      {isEdit ? (
        <Button
          size="sm"
          type="submit"
          variant="secondary"
          onClick={handleUpdate}
        >
          Update
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          aria-label="Edit Task"
          onClick={() => setIsEdit((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      )}
      <Button
        size="sm"
        variant="secondary"
        aria-label="Delete Task"
        onClick={() => removeTask(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </li>
  );
};

export default Task;
