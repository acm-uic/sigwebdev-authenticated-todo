import React, { FC } from 'react'
import { Todo } from 'models/Todo'
interface TodoProps {
    markTodo(id: string, value: boolean): void
    deleteTodo(id: string): void
    todo: Todo
}

// * Export Header Component
export const TodoItem: FC<TodoProps> = props => {
    // * Grab needed information from props
    const { todo, deleteTodo, markTodo } = props

    return (
        <div className="todo col-sm-5">
            <div className="card">
                <div className="card-header">
                    <h2 className={`${todo.completed ? 'marked' : ''}`}>{todo.title}</h2>
                </div>

                {/* If Todo not completed, show body */ !todo.completed && (
                    <div className="card-body">
                        <p>{todo.description}</p>
                    </div>
                )}

                <div className="card-footer container">
                    <div className="row">
                        <div className="col-6">
                            <button
                                onClick={() => markTodo(todo.id, !todo.completed)}
                                className="btn btn-primary btn-block"
                            >
                                Mark as {todo.completed ? 'incomplete' : 'done'}
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-danger btn-block"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                                <i className="fa fa-minus-circle fa-lg" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
