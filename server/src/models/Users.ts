import { Schema, Document, model } from 'mongoose'

export interface ITodo {
    title: string
    description: string
    id: string
    completed: boolean
}

export interface IUser extends Document {
    username: string
    password: string
    todos: ITodo[]
}

export const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    todos: [
        {
            title: String,
            description: String,
            completed: Boolean,
            id: String
        }
    ]
})

export default model<IUser>('users', UserSchema)
