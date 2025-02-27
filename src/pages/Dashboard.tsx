import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { TaskForm } from "../components/TaskForm.tsx";
import { Category, Priority, Status, Task } from "../models/Task.ts";
import {User} from "../models/User.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

const motivationalQuotes = [
    "The secret of getting ahead is getting started. 🌟",
    "Done is better than perfect. ✨",
    "Make each day your masterpiece. 🎨",
    "Stay focused, go after your dreams! 🚀",
    "Small progress is still progress. 🌱",
];


export const Dashboard = (user:User) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [quote, setQuote] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const randomQuote =
            motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setQuote(randomQuote);
    }, []);

    const completedTasks = tasks.filter((task) => task.status === Status.COMPLETED);

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.taskName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            filterCategory === "all" || task.category === filterCategory;
        const matchesPriority =
            filterPriority === "all" || task.priority === filterPriority;
        return matchesSearch && matchesCategory && matchesPriority;
    });

    const statusData = {
        labels: ["Completed", "In Progress", "Not Started"],
        datasets: [
            {
                data: [
                    tasks.filter((t) => t.status === Status.COMPLETED).length,
                    tasks.filter((t) => t.status === Status.IN_PROGRESS).length,
                    tasks.filter((t) => t.status === Status.NOT_STARTED).length,
                ],
                backgroundColor: ["#A5D8A7", "#FFB74D", "#E57373"],
            },
        ],
    };

    const categoryData = {
        labels: Object.values(Category),
        datasets: [
            {
                data: Object.values(Category).map((category) =>
                    tasks.filter((t) => t.category === category).length
                ),
                backgroundColor: [
                    "#B39DDB",
                    "#90CAF9",
                    "#80DEEA",
                    "#FFE082",
                    "#F48FB1",
                ],
            },
        ],
    };

    const toggleTaskStatus = (taskId: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: task.status === Status.COMPLETED ? Status.NOT_STARTED : Status.COMPLETED,
                    }
                    : task,
            ),
        );
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task: Task) => task.id !== taskId));
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
        setShowTaskForm(true);
    };

    return (
        <div className="min-h-screen bg-purple-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <header className="bg-white rounded-lg p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Welcome, {user.name}! 👋
                            </h1>
                            <p className="text-gray-500 mt-2">
                                {format(new Date(), "EEEE, MMMM do, yyyy")} 📅
                            </p>
                        </div>
                        <p className="mt-4 md:mt-0 text-purple-600 italic">{quote}</p>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-medium text-gray-700">
                            Total Tasks 📝
                        </h3>
                        <p className="text-3xl font-bold text-purple-500 mt-2">
                            {tasks.length}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Tasks in total</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-medium text-gray-700">Completed ✅</h3>
                        <p className="text-3xl font-bold text-green-500 mt-2">
                            {completedTasks.length}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Tasks completed</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <Pie
                            data={statusData}
                            options={{
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <Pie
                            data={categoryData}
                            options={{
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-gray-800">Tasks 📋</h2>
                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="work">Work 💼</option>
                                    <option value="personal">Personal 🏠</option>
                                    <option value="study">Study 📚</option>
                                    <option value="shopping">Shopping 🛒</option>
                                    <option value="health">Health 🏥</option>
                                </select>
                                <select
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="low">Low 🟢</option>
                                    <option value="medium">Medium 🟡</option>
                                    <option value="high">High 🔴</option>
                                </select>
                                <button
                                    onClick={() => {
                                        setEditingTask(null);
                                        setShowTaskForm(true);
                                    }}
                                    className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors flex items-center gap-2"
                                >
                                    <Plus size={20} />
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </div>
                    {showTaskForm && (
                        <TaskForm
                            onClose={() => setShowTaskForm(false)}
                            onSave={(task) => {
                                if (editingTask) {
                                    setTasks(
                                        tasks.map((t) => (t.id === editingTask.id ? task : t)),
                                    );
                                } else {
                                    setTasks([
                                        ...tasks,
                                        {
                                            ...task,
                                            id: Date.now(),
                                        },
                                    ]);
                                }
                                setShowTaskForm(false);
                                setEditingTask(null);
                            }}
                            editingTask={editingTask}
                        />
                    )}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Task</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Priority</th>
                                <th className="py-3 px-4 text-left">Due Date</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredTasks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500">
                                        No tasks found 🔍 <br />
                                        <span className="text-sm">
                        Try adjusting your filters or add a new task
                      </span>
                                    </td>
                                </tr>
                            ) : (
                                filteredTasks.map((task) => (
                                    <tr
                                        key={task.id}
                                        className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-3 px-4">
                                            <input
                                                type="checkbox"
                                                checked={task.status === Status.COMPLETED}
                                                onChange={() => toggleTaskStatus(task.id)}
                                                className="rounded text-purple-400 focus:ring-purple-400"
                                            />
                                        </td>
                                        <td
                                            className={`py-3 px-4 ${task.status === Status.COMPLETED ? "line-through text-gray-400" : ""}`}
                                        >
                                            <div className="flex flex-col">
                                                <span>{task.taskName}</span>
                                                {task.description && (
                                                    <span className="text-sm text-gray-500 truncate max-w-xs">
                              {task.description}
                            </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {task.category}
                        </span>
                                        </td>
                                        <td className="py-3 px-4">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.priority === Priority.HIGH ? "bg-red-100 text-red-800" : task.priority === Priority.MEDIUM ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                        >
                          {task.priority}
                        </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            {format(new Date(task.dueDate), "MMM dd, yyyy")}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => editTask(task)}
                                                    className="text-blue-400 hover:text-blue-500 p-1 hover:bg-blue-50 rounded-full transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="text-red-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};