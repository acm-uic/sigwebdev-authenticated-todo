import React, { FC } from 'react'
import { User } from 'models/User'
import { AddTodo } from '@components/AddTodo'
import { TodoItem } from '@components/TodoItem'
import axios from 'axios'

interface TodoListProps {
    user: User | null
    setUser(user: User): void
}

// * Export Header Component
export const TodoList: FC<TodoListProps> = props => {
    const { user, setUser } = props

    const addTodo = async (title: string, description: string) => {
        // * Post todo to API
        await axios.post('/api/addtodo', {
            title,
            description
        })

        // * Update User Object to refresh application
        const user = (await axios.get('/api/user')).data
        setUser(user)
    }

    const deleteTodo = async (id: string) => {
        // * Post to deletetodo route in API
        axios.post('/api/deletetodo', {
            id
        })

        // * Update User Object to refresh application
        const user = (await axios.get('/api/user')).data
        setUser(user)
    }

    const markTodo = async (id: string, value: boolean) => {
        // * Post to marktodo route in API
        axios.post('/api/marktodo', {
            id,
            value
        })

        // * Update User Object to refresh application
        const user = (await axios.get('/api/user')).data
        setUser(user)
    }

    return (
        <div className="todoList container ">
            <div className="row justify-content-md-center">
                {user !== null &&
                    // * Map over all of the users todos and list them out
                    user.todos.map((todo, index) => {
                        return (
                            <TodoItem
                                key={index}
                                markTodo={markTodo}
                                deleteTodo={deleteTodo}
                                todo={todo}
                            />
                        )
                    })}
            </div>
            <AddTodo addTodo={addTodo} />
        </div>
    )
}
