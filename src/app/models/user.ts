import { Note } from "src/app/models/note";

export interface User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    notes?: Note[];
}
