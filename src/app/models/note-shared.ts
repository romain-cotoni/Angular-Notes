import { Right } from "../enums/right";
import { Note } from "./note";
import { UserShared } from "./user-shared";

export interface NoteShared extends Note {
    "public"?: boolean;
    "right"?: Right;
    "sharedUsers"?: UserShared[];
}
