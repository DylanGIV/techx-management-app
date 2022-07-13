import { Project } from "../response/ProjectResponse";
import { Task } from "../response/TaskResponse";

export interface Data {
    companies : any[];
    projects : Project[];
    tasks : Task[];
}