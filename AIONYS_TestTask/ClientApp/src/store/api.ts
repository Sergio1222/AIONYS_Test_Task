import axios from "axios";
import { Note } from "./Notes";

const baseUrl = `https://localhost:5001/api/`

export default {
    
    apiNote(url = baseUrl + 'notes/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id: number) => axios.get(url + id),
            create: (newNote: Note) => axios.post(url, newNote),
            update: (id: number, updateNote: any) => axios.put(url + id, updateNote),
            delete: (id: number) => axios.delete(url + id)
        }
    },

    RestAPI<T>(url: string) {
        return {
            fetchAll: (): Promise<T[]> => {
                const data = axios.get(baseUrl + url)
                    .then(response => response.data as Promise<T[]>)
                return data;
            },
            fetchById: (id: number): Promise<T> => {
                const data = axios.get(baseUrl + url + id)
                    .then(response => response.data as Promise<T>);
                return data;
            },
            create: (newRecord: T): Promise<T> => {
                const data = axios.post(baseUrl + url, newRecord)
                    .then(response => response.data as Promise<T>)
                return data;
            },
            update: (id: number, updatedRecord: T) => {
                axios.put(baseUrl + url + id, updatedRecord)
            },
            delete: (id: number) => axios.delete(baseUrl + url + id)
        }
    }
} 