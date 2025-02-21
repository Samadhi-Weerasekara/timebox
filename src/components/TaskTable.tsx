import { Check, X } from "lucide-react";
export const TaskTable = ({ tasks, onToggleTask }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-full">
                <thead>
                <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left">Done</th>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Task</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Priority</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Duration</th>
                    <th className="py-3 px-4 text-left">Due Date</th>
                    <th className="py-3 px-4 text-left">Description</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task, index) => (
                    <tr key={index} className="border-t">
                        <td className="py-3 px-4">
                            <button
                                onClick={() => onToggleTask(index)}
                                className={`p-1 rounded ${task.completed ? "text-green-600" : "text-gray-400"}`}
                            >
                                {task.completed ? <Check size={20} /> : <X size={20} />}
                            </button>
                        </td>
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{task.task}</td>
                        <td className="py-3 px-4 capitalize">{task.category}</td>
                        <td className="py-3 px-4">
                <span
                    className={`px-2 py-1 rounded text-sm ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                >
                  {task.priority}
                </span>
                        </td>
                        <td className="py-3 px-4 capitalize">{task.status}</td>
                        <td className="py-3 px-4">{task.duration} min</td>
                        <td className="py-3 px-4">{task.dueDate}</td>
                        <td className="py-3 px-4">
                            <p className="truncate max-w-xs" title={task.description}>
                                {task.description}
                            </p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
