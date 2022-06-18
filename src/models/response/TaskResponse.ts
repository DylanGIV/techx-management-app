import { Account } from "./AccountResponse";
import { Project } from "./ProjectResponse";

export interface Task {
    assignedTo: Account;
    createdBy: Account;
    createdAt: Date;
    dueDate: Date;
    description: string;
    id: number;
    project: Project;
    title: string;
}