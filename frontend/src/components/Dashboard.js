import React from 'react';
import authService from './authService';

const Dashboard = () => {
    const currentUser = authService.getCurrentUser();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {currentUser.user.name}!</p>
        </div>
    );
};

export default Dashboard;
