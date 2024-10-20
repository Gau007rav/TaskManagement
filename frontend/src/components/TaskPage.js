import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TasksPage() {
  const [tasksUpdated, setTasksUpdated] = useState(false);

  // Refresh the task list when a new task is added
  const handleTaskAdded = () => {
    setTasksUpdated(!tasksUpdated);
  };

  return (
    <div className="container mx-auto p-6">
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={tasksUpdated} />
    </div>
  );
}

export default TasksPage;
