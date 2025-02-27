// Define the Task interface and enums
export interface Task {
    id: number;
    taskName: string;
    category: Category;
    priority: Priority;
    status: Status;
    duration: Duration;
    dueDate: string;
    description: string;
    completed: boolean;
}

export enum Category {
    WORK = "Work 💼",
    PERSONAL = "Personal 🏠",
    STUDY = "Study 📚",
    SHOPPING = "Shopping 🛒",
    HEALTH = "Health 🏥",
}

export enum Priority {
    LOW = "Low 🟢",
    MEDIUM = "Medium 🟡",
    HIGH = "High 🔴",
}

export enum Status {
    NOT_STARTED = "Not Started ⭕",
    IN_PROGRESS = "In Progress 🔄",
    COMPLETED = "Completed ✅",
}

export enum Duration {
    MINUTES_15 = "15 minutes 🕛",
    MINUTES_30 = "30 minutes 🕐",
    HOUR_1 = "1 hour 🕑",
    HOUR_2 = "2 hours 🕒",
}