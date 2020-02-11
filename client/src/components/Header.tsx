import React, { FC } from 'react'
import ACMLogo from '@assets/acmlogo.png'
import { User } from 'models/User'

interface HeaderProps {
    user: User | null
}

// * Export Header Component
export const Header: FC<HeaderProps> = props => {
    const { user } = props
    return (
        <div className="header">
            <div className="row">
                <img src={ACMLogo} style={{ display: 'inline' }} />
                <span>
                    <h1> SIG WebDev Todo Application</h1>
                    {user && <h2> Welcome, {user.username}</h2>}
                </span>
            </div>
        </div>
    )
}
