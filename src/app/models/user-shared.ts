import { Right } from "../enums/right";

export interface UserShared {
    userId?: number;
    username?: string;
    right?: Right;
}
