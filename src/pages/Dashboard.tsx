import {useState} from "react";
import {Task} from "../models/Task.ts";
import {Header} from "../components/Header.tsx";
import {TaskForm} from "../components/TaskForm.tsx";
import {TaskTable} from "../components/TaskTable.tsx";
import {TaskChart} from "../components/TaskChart.tsx";

export const Dashboard = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAddTask = (newTask: Task) => {
        // Create a new task object with the completed property set to false
        const taskToAdd: Task = {
            id: newTask.id,
            taskName: newTask.taskName,
            category: newTask.category,
            priority: newTask.priority,
            status: newTask.status,
            duration: newTask.duration,
            dueDate: newTask.dueDate,
            description: newTask.description,
            completed: false,
        };

        // Create a new array by copying the existing tasks and adding the new task
        const updatedTasks = tasks.concat(taskToAdd);

        // Update the state with the new array
        setTasks(updatedTasks);
    };

    const handleToggleTask = (index: number) => {
        // Create a new array by mapping over the existing tasks
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                // If the task is at the specified index, toggle its completed status
                return {
                    ...task,
                    completed: !task.completed,
                };
            } else {
                // Otherwise, return the task as is
                return task;
            }
        });

        // Update the state with the new array
        setTasks(updatedTasks);
    };
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <Header/>
                <main className="container mx-auto px-4 py-6">
                    <TaskForm onAddTask={handleAddTask}/>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2">
                            <TaskTable tasks={tasks} onToggleTask={handleToggleTask}/>
                        </div>
                        <div className="lg:col-span-1">
                            <TaskChart tasks={tasks}/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};