import React, { FC, useState } from 'react'
import Modal from 'react-modal'

interface addTodoProps {
    addTodo(title: string, description: string): void
}

// * Export Header Component
export const AddTodo: FC<addTodoProps> = props => {
    // * State Declarations
    const [todo, setTodo] = useState('')
    const [description, setDescription] = useState('')
    const [showModal, setModal] = useState(false)

    // * Add Todo Function
    const add = () => {
        // * Trigger add todo in parent
        props.addTodo(todo, description)

        // * Close modal
        setModal(false)

        // * Reset TODO & Description
        setTodo('')
        setDescription('')
    }

    return (
        <div className="addTodo">
            <button
                disabled={showModal}
                onClick={() => setModal(true)}
                className="add-btn btn btn-danger btn-lg"
            >
                <span className="fa fa-plus-circle fa-lg" aria-hidden="true"></span>
            </button>
            <Modal className="addTodo-modal" isOpen={showModal} ariaHideApp={false}>
                <div className="addTodo-content">
                    <div className="header">
                        <h1>Add a Todo Task:</h1>
                    </div>
                    <div className="panel">
                        <div className="col-md-12">
                            <input
                                className="form-control form-control-lg"
                                placeholder="Enter Todo Title"
                                value={todo}
                                onChange={evt => setTodo(evt.target.value)}
                            />
                            <textarea
                                className="form-control form-control-lg"
                                placeholder="Enter Todo Description"
                                value={description}
                                onChange={evt => setDescription(evt.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-md-12">
                            <button onClick={add} className="btn btn-lg btn-danger btn-block">
                                Add ToDo
                                <span
                                    style={{ marginLeft: '1rem' }}
                                    className="fa fa-plus-circle fa-lg"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
