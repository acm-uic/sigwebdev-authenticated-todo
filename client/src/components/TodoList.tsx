import React, { FC } from 'react'
import { User } from '@interfaces/User'
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
        console.log('POSTED')

        // * Post todo to API
        await axios.post('/api/addtodo', {
            title,
            description
        })

        // * Update User Object to refresh application
        const user = (await axios.get('/api/user')).data
        console.log(user)
        setUser(user)
    }

    const deleteTodo = async (id: string) => {
        // TODO: Make API Request to Delete Todo given string ID
        axios.post('/api/deletetodo', {
            id
        })

        // * Update User Object to refresh application
        const user = (await axios.get('/api/user')).data
        console.log(user)
        setUser(user)
    }

    const markTodo = async (id: string, value: boolean) => {
        // TODO: Make API Request to mark todo as completed/not completed
        axios.post('/api/marktodo', {
            id,
            value
        })
        // * Update User Object to refresh application
        const user = (await axios.get('/api/user')).data
        console.log(user.todos)
        setUser(user)
    }

    return (
        <div className="todoList container ">
            <AddTodo addTodo={addTodo} />
            <div className="row justify-content-md-center">
                {user !== null &&
                    // TODO: Map over user todos and render proper HTML
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
        </div>
    )
}
