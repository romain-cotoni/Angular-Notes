import { Right } from "../enums/right";

export interface AuthRequest {
    username?: string;
    password?: string;
}

export interface SubscribeRequest extends AuthRequest  {
    firstname?: string;
    lastname?: string;
    email?: string;
}

export interface SubscribeFromAdminRequest extends SubscribeRequest  {
    role?: string;
}

export interface AuthResponse {
    
}

export interface Note {
    id?: number;
    title?: string;
    content?: string;
    creation?: Date;
}

export interface NoteShared extends Note {
    public?: boolean;
    right?: Right;
    users?: UserShared[];
}

export interface NoteModify extends Note {
    lastModified?: Date;
    lastUserModifiedBy: User;
}

export interface User {
    id?: number;
    username?: string;
}

export interface UserDetails extends User {
    firstname?: string;
    lastname?: string;
    email?: string;
    notes?: Note[];
}


export interface UserShared extends User {
    right?: Right;
}
