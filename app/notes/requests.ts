import { Note } from "./api";

const serverAddress = 'http://localhost:3000';

export const requests = {
    note: (id: string, options = {}) => fetch(`${serverAddress}/api/notes/${id}`, options).then((res) => res.json()) as Promise<Note>,
    notes: (options = {}) => fetch(`${serverAddress}/api/notes`, options).then((res) => res.json()) as Promise<Note[]>
}
