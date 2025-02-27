import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import {Category, Duration, Priority, Status, Task} from "../models/Task.ts";

interface TaskFormProps {
    onClose: () => void;
    onSave: (task: Task) => void;
    editingTask: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSave, editingTask }) => {
    const [task, setTask] = useState<Task>({
        id: editingTask?.id || Date.now(),
        taskName: "",
        category: Category.WORK,
        priority: Priority.MEDIUM,
        status: Status.NOT_STARTED,
        duration: Duration.MINUTES_15,
        dueDate: new Date().toISOString().split("T")[0],
        description: "",
        completed: false,
    });

    useEffect(() => {
        if (editingTask) {
            setTask({
                ...editingTask,
                dueDate: new Date(editingTask.dueDate).toISOString().split("T")[0],
            });
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(task);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>
                <h3 className="text-xl font-semibold mb-4">
                    {editingTask ? "Edit Task" : "Add New Task"} ✏️
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Task Name
                            </label>
                            <input
                                type="text"
                                value={task.taskName}
                                onChange={(e) => setTask({ ...task, taskName: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                                placeholder="Enter task name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                value={task.category}
                                onChange={(e) => setTask({ ...task, category: e.target.value as Category })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {Object.values(Category).map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Priority
                            </label>
                            <select
                                value={task.priority}
                                onChange={(e) => setTask({ ...task, priority: e.target.value as Priority })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {Object.values(Priority).map((pri) => (
                                    <option key={pri} value={pri}>
                                        {pri}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                value={task.status}
                                onChange={(e) => setTask({ ...task, status: e.target.value as Status })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {Object.values(Status).map((stat) => (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Duration
                            </label>
                            <select
                                value={task.duration}
                                onChange={(e) => setTask({ ...task, duration: e.target.value as Duration })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {Object.values(Duration).map((dur) => (
                                    <option key={dur} value={dur}>
                                        {dur}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={task.dueDate}
                                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500"
                        >
                            {editingTask ? "Update Task" : "Add Task"} ✨
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};