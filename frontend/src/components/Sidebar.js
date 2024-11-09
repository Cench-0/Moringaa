import React from 'react';

function Sidebar() {
    return (
        <aside>
            <ul>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/pairing">Generate Pairs</a></li>
                <li><a href="/history">History</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </aside>
    );
}

export default Sidebar;
