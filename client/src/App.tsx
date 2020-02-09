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
            // TODO: Fetch User & Todos from API
            setState({ ...state, loaded: true })
        }
    }, [user]) // ! As provided in the second argument

    // * Logout Function
    const logOut = () => {
        // TODO: Log user out and set user to null
    }

    // * Login Function
    const logIn = () => {
        // TODO: Log user in and set user to user object
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
                        <h3> Not Loaded </h3>
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
                                Not Logged In
                            </div>
                        ) : (
                            <div>
                                {
                                    // * User Logged In
                                }
                                Logged In
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
