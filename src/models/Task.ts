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
    WORK = "WORK",
    PERSONAL = "PERSONAL",
    STUDY = "STUDY",
    SHOPPING = "SHOPPING",
    HEALTH = "HEALTH",
}

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}

export enum Status {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export enum Duration {
    MINUTES_15 = "15_MINUTES",
    MINUTES_30 = "30_MINUTES",
    HOUR_1 = "1_HOUR",
    HOUR_2 = "2_HOURS",
}