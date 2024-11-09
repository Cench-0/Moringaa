import React, { useState } from 'react';

function UserProfile() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Profile saved", name, email);
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleSave}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}

export default UserProfile;
