/*
 * File: /src/App.tsx
 * File Created: Wednesday, 11th December 2019 11:29:00 pm
 * Author: Alex Chomiak
 *
 * Last Modified: Sunday, 5th January 2020 4:29:11 pm
 * Modified By: Alex Chomiak
 *
 * Author Github: https://github.com/alexchomiak
 */

import React, { FC, useState, useEffect } from 'react'
import { Header } from '@components/Header'
import { User } from '@interfaces/User'
import { LoginModal } from '@components/LoginModal'
import { TodoList } from '@components/TodoList'
import { ErrorFunction, ErrorMessage } from '@interfaces/Error'
import axios from 'axios'

// * Application State Interface
interface AppState {
    loaded: boolean
    user: User | null
}

// * const (constant variable) (can also use let, var to declare variables)
// * variablename : type (Typescript variable declaration)
// ? Why do this?
// ! Typescript enables strict type checking, without it
// ! in large projects javascript data types may be mutilated
// ! and cause very hard bugs to find
// * Export just exports the App object out of the module
export const App: FC = () => {
    // * useState enables this component to use application state
    const [state, setState] = useState<AppState>({
        user: null,
        loaded: false
    })

    // * Destructure user, loaded values from state object
    const { user, loaded } = state

    // * useEffect is called everytime user value changes
    useEffect(() => {
        if (!loaded) {
            // * Fetch user from API
            axios
                .get('/api/user')
                .then(response => {
                    // * If user exist, set state with user and return
                    if (response.status < 400) {
                        const user = response.data
                        console.log(user)
                        setState({ ...state, loaded: true, user })
                        return
                    }
                })
                .catch(() => {
                    // * Otherwise set loaded state to true, (login modal will appear)
                    setState({ ...state, loaded: true })
                })
        }
    }, [user]) // ! As provided in the second argument

    // * Logout Function
    const logout = async () => {
        await axios.post('/api/logout')
        setState({ ...state, user: null })
    }

    // * Login Function
    const login = async (username: string, password: string, onError: ErrorFunction) => {
        // TODO: Write login route (very similar to register route
        try {
            // * Post login request to form
            const response = await axios.post('/api/login', {
                username,
                password
            })

            // * Retrieve user from response if logged in
            const user: User = response.data

            // * Set user
            setState({ ...state, user })
        } catch (err) {
            // * Grab error message from response and display error to user in modal
            const error: ErrorMessage = err.response.data
            onError(error.message)
        }
    }

    // * Register Function
    const register = async (username: string, password: string, onError: ErrorFunction) => {
        console.log(`Attempting to register ${username} : ${password}`)

        try {
            // * Post registration form to API
            const response = await axios.post('/api/register', {
                username,
                password
            })

            // * Retrieve user from response if created
            const user: User = response.data

            // * Set user
            setState({ ...state, user })
        } catch (err) {
            // * Grab error message from response and display error to user in modal
            const error: ErrorMessage = err.response.data
            onError(error.message)
        }
    }
    return (
        <div className="app">
            <Header />
            <div className="container">
                {console.log('Anything inside brackets within jsx is traditional typescript!')}
                {!loaded && (
                    <div>
                        {
                            // * App Not Loaded
                        }
                        <h3 style={{ textAlign: 'center' }}> Loading </h3>
                    </div>
                )}

                {loaded && (
                    <div>
                        {
                            // * App Loaded */
                        }
                        {user === null ? (
                            <div>
                                {
                                    // * User Not Logged In
                                }
                                <LoginModal onLogin={login} onRegister={register} />
                            </div>
                        ) : (
                            <div>
                                {
                                    // * User Logged In
                                }
                                <TodoList
                                    user={user}
                                    setUser={(user: User) => setState({ ...state, user })}
                                />

                                <button onClick={logout} className="btn btn-outline-light logout">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
