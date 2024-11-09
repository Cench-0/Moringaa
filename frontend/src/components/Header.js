import React from 'react';

function Header() {
    return (
        <header>
            <h1>MoringaPair</h1>
            <nav>
                <a href="/">Dashboard</a>
                <a href="/history">History</a>
                <a href="/profile">Profile</a>
            </nav>
        </header>
    );
}

export default Header;
