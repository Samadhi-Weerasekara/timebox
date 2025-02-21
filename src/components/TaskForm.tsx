import { Plus } from "lucide-react";
import { useState } from "react";
import { Category, Priority, Status, Duration, Task } from "../models/Task.ts"; // Adjust the import path as needed

interface TaskFormProps {
    onAddTask: (newTask: Task) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskData, setTaskData] = useState<Omit<Task, "id" | "completed">>({
        taskName: "",
        category: Category.WORK,
        priority: Priority.MEDIUM,
        status: Status.PENDING,
        duration: Duration.MINUTES_15,
        dueDate: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a unique ID for the new task (for demo purposes)
        const newTask: Task = {
            ...taskData,
            id: Date.now(), // Use timestamp as a simple unique ID
            completed: false,
        };

        onAddTask(newTask);

        // Reset form data
        setTaskData({
            taskName: "",
            category: Category.WORK,
            priority: Priority.MEDIUM,
            status: Status.PENDING,
            duration: Duration.MINUTES_15,
            dueDate: "",
            description: "",
        });

        // Close the form
        setIsFormOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="flex items-center gap-2 text-blue-600 font-medium"
            >
                <Plus size={20} />
                {isFormOpen ? "Close Form" : "Add New Task"}
            </button>
            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Task Name"
                        value={taskData.taskName}
                        onChange={(e) =>
                            setTaskData({ ...taskData, taskName: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    />
                    <select
                        value={taskData.category}
                        onChange={(e) =>
                            setTaskData({ ...taskData, category: e.target.value as Category })
                        }
                        className="border p-2 rounded"
                    >
                        {Object.values(Category).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select
                        value={taskData.priority}
                        onChange={(e) =>
                            setTaskData({ ...taskData, priority: e.target.value as Priority })
                        }
                        className="border p-2 rounded"
                    >
                        {Object.values(Priority).map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                    <select
                        value={taskData.status}
                        onChange={(e) =>
                            setTaskData({ ...taskData, status: e.target.value as Status })
                        }
                        className="border p-2 rounded"
                    >
                        {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <select
                        value={taskData.duration}
                        onChange={(e) =>
                            setTaskData({ ...taskData, duration: e.target.value as Duration })
                        }
                        className="border p-2 rounded"
                    >
                        {Object.values(Duration).map((duration) => (
                            <option key={duration} value={duration}>
                                {duration}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) =>
                            setTaskData({ ...taskData, dueDate: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({ ...taskData, description: e.target.value })
                        }
                        className="border p-2 rounded md:col-span-2"
                        rows={3}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 md:col-span-2"
                    >
                        Add Task
                    </button>
                </form>
            )}
        </div>
    );
};