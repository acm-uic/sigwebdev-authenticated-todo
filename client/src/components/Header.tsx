import React, { FC } from 'react'
import ACMLogo from '@assets/acmlogo.png'

// * Export Header Component
export const Header: FC = () => {
    return (
        <div className="header">
            <img src={ACMLogo} />
            <div style={{ display: 'inline' }}>
                <h1> SIG WebDev Todo Application</h1>
            </div>
        </div>
    )
}
