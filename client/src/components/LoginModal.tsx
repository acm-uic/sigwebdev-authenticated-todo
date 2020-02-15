import React, { FC, useState, FormEvent } from 'react'
import Modal from 'react-modal'
import ACMLogo from '../assets/acmlogo.png'
import { ErrorFunction } from 'models/Error'

// * Login Modal, allows user to login/register with application
interface tabState {
    name: string
}

//  * Login Modal Props
interface LoginModalProps {
    onLogin(username: string, password: string, onError: ErrorFunction): any
    onRegister(username: string, password: string, onError: ErrorFunction): any
}

// * Login Modal component
export const LoginModal: FC<LoginModalProps> = props => {
    // * Tab in modal
    const [currentTab, setTab] = useState<tabState>({
        name: 'login'
    })

    // * Data Bindings for form input
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // * Error Messages
    const [registrationError, setRegistrationError] = useState('')
    const [loginErrror, setLoginError] = useState('')

    // * Login Submission
    const onLoginFormSubmit = (evt: FormEvent) => {
        // * Prevent default behavior (default refreshes page)
        evt.preventDefault()

        // * Make sure user name is provided
        if (username.length == 0) {
            setLoginError('Username not provided!')
            return
        }

        // * trigger onloggin in parent
        props.onLogin(username, password, err => setLoginError(err))
    }

    // * Registration
    const onRegisterFormSubmit = (evt: FormEvent) => {
        // * Prevent default behavior (default refreshes page)
        evt.preventDefault()

        // * Assert username length > 0
        if (username.length == 0) {
            setRegistrationError('Username not provided!')
            return
        }

        // * Assert password length < 5
        if (password.length < 5) {
            setRegistrationError('Password is not of correct length!')
            return
        }

        // * Make sure password is same as confirmation
        if (password == confirmPassword) {
            // * Trigger register in parent
            props.onRegister(username, password, err => setRegistrationError(err))
        } else {
            // * Otherwise set registration error
            setRegistrationError('Passwords do not match!')
        }
    }

    return (
        <div>
            <Modal className="login-modal-object" isOpen={true} ariaHideApp={false}>
                <div className="login-modal">
                    <img src={ACMLogo} />
                    <h1>ToDo List</h1>
                    <div className="panel">
                        {currentTab.name === 'login' && (
                            <div className="container">
                                <h2>
                                    <span className="fa fa-user fa-sm" aria-hidden="true"></span>
                                    Login To Your Account
                                </h2>
                                <hr />
                                <p> {loginErrror}</p>
                                <form onSubmit={onLoginFormSubmit}>
                                    <div className="form-item">
                                        <h3>Username:</h3>
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={evt => setUsername(evt.target.value)}
                                        />
                                    </div>
                                    <div className="form-item">
                                        <h3>Password:</h3>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Password"
                                            name="password"
                                            value={password}
                                            onChange={evt => setPassword(evt.target.value)}
                                        />
                                    </div>
                                    <hr />

                                    <div className="row form-item no-gutters">
                                        <div className="col-8">
                                            <button
                                                autoFocus
                                                className="btn btn-lg btn-primary btn-block"
                                            >
                                                Login
                                                <span
                                                    className="fa fa-check fa-lg"
                                                    aria-hidden="true"
                                                ></span>
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button
                                                onClick={() => setTab({ name: 'register' })}
                                                className="btn btn-lg btn-dark btn-block"
                                            >
                                                Register Here
                                                <span
                                                    className="fa fa-address-card fa-lg"
                                                    aria-hidden="true"
                                                ></span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {currentTab.name === 'register' && (
                            <div className="container">
                                <h2>
                                    <span className="fa fa-list fa-sm" aria-hidden="true"></span>
                                    Register for ACM Todo List
                                </h2>
                                <hr />
                                <p> {registrationError}</p>
                                <form onSubmit={onRegisterFormSubmit}>
                                    <div className="form-item">
                                        <h3>Username:</h3>
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={evt => setUsername(evt.target.value)}
                                        />
                                    </div>
                                    <div className="form-item">
                                        <h3>Password:</h3>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Password"
                                            name="password"
                                            value={password}
                                            onChange={evt => setPassword(evt.target.value)}
                                        />
                                    </div>
                                    <div className="form-item">
                                        <h3>Confirm Password:</h3>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Password Again"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={evt => setConfirmPassword(evt.target.value)}
                                        />
                                    </div>
                                    <hr />

                                    <div className="row form-item no-gutters">
                                        <div className="col-7">
                                            <button
                                                autoFocus
                                                className="btn btn-lg btn-primary btn-block"
                                            >
                                                Register
                                                <span
                                                    className="fa fa-code fa-lg"
                                                    aria-hidden="true"
                                                ></span>
                                            </button>
                                        </div>
                                        <div className="col-5">
                                            <button
                                                onClick={() => setTab({ name: 'login' })}
                                                className="btn btn-lg btn-dark btn-block"
                                            >
                                                Already Have an Account?
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
