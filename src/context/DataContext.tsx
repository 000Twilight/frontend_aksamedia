// @ts-nocheck
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsersFromStorage();
    }, []);

    const loadUsersFromStorage = () => {
        try {
            const savedUsers = localStorage.getItem('crudUsers');
            if (savedUsers) {
                setUsers(JSON.parse(savedUsers));
            } else {
                const sampleUsers = [
                    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', department: 'IT', position: 'Developer', createdAt: new Date().toISOString() },
                    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1234567891', department: 'HR', position: 'Manager', createdAt: new Date().toISOString() },
                    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1234567892', department: 'Finance', position: 'Analyst', createdAt: new Date().toISOString() },
                    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', phone: '+1234567893', department: 'Marketing', position: 'Specialist', createdAt: new Date().toISOString() },
                    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', phone: '+1234567894', department: 'IT', position: 'Senior Developer', createdAt: new Date().toISOString() },
                    { id: 6, name: 'Diana Davis', email: 'diana.davis@example.com', phone: '+1234567895', department: 'Sales', position: 'Representative', createdAt: new Date().toISOString() },
                    { id: 7, name: 'Agus Pratama', email: 'agus.pratama@example.com', phone: '+1234567896', department: 'IT', position: 'System Admin', createdAt: new Date().toISOString() },
                    { id: 8, name: 'Agus Setiawan', email: 'agus.setiawan@example.com', phone: '+1234567897', department: 'Finance', position: 'Accountant', createdAt: new Date().toISOString() },
                    { id: 9, name: 'Sarah Connor', email: 'sarah.connor@example.com', phone: '+1234567898', department: 'Security', position: 'Chief', createdAt: new Date().toISOString() },
                    { id: 10, name: 'Michael Scott', email: 'michael.scott@example.com', phone: '+1234567899', department: 'Management', position: 'Regional Manager', createdAt: new Date().toISOString() },
                    { id: 11, name: 'Agus Supriyanto', email: 'agus.supriyanto@example.com', phone: '+1234567800', department: 'Marketing', position: 'Director', createdAt: new Date().toISOString() },
                    { id: 12, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', phone: '+1234567801', department: 'HR', position: 'Recruiter', createdAt: new Date().toISOString() },
                    { id: 13, name: 'David Lee', email: 'david.lee@example.com', phone: '+1234567802', department: 'IT', position: 'Data Scientist', createdAt: new Date().toISOString() },
                    { id: 14, name: 'Emma Thompson', email: 'emma.thompson@example.com', phone: '+1234567803', department: 'Marketing', position: 'Content Writer', createdAt: new Date().toISOString() },
                    { id: 15, name: 'James Rodriguez', email: 'james.rodriguez@example.com', phone: '+1234567804', department: 'Sales', position: 'Account Manager', createdAt: new Date().toISOString() },
                    { id: 16, name: 'Sophia Kim', email: 'sophia.kim@example.com', phone: '+1234567805', department: 'IT', position: 'Frontend Developer', createdAt: new Date().toISOString() },
                    { id: 17, name: 'William Chen', email: 'william.chen@example.com', phone: '+1234567806', department: 'Finance', position: 'Budget Analyst', createdAt: new Date().toISOString() },
                    { id: 18, name: 'Olivia Martinez', email: 'olivia.martinez@example.com', phone: '+1234567807', department: 'HR', position: 'Training Coordinator', createdAt: new Date().toISOString() },
                    { id: 19, name: 'Lucas Garcia', email: 'lucas.garcia@example.com', phone: '+1234567808', department: 'IT', position: 'DevOps Engineer', createdAt: new Date().toISOString() },
                    { id: 20, name: 'Maya Patel', email: 'maya.patel@example.com', phone: '+1234567809', department: 'Marketing', position: 'Social Media Manager', createdAt: new Date().toISOString() },
                    { id: 21, name: 'Ryan Murphy', email: 'ryan.murphy@example.com', phone: '+1234567810', department: 'Sales', position: 'Sales Director', createdAt: new Date().toISOString() },
                    { id: 22, name: 'Ava Wilson', email: 'ava.wilson@example.com', phone: '+1234567811', department: 'Finance', position: 'Financial Controller', createdAt: new Date().toISOString() },
                    { id: 23, name: 'Ethan Taylor', email: 'ethan.taylor@example.com', phone: '+1234567812', department: 'IT', position: 'Security Specialist', createdAt: new Date().toISOString() },
                    { id: 24, name: 'Isabella Clark', email: 'isabella.clark@example.com', phone: '+1234567813', department: 'HR', position: 'Benefits Administrator', createdAt: new Date().toISOString() },
                    { id: 25, name: 'Noah Walker', email: 'noah.walker@example.com', phone: '+1234567814', department: 'Marketing', position: 'Brand Manager', createdAt: new Date().toISOString() },
                    { id: 26, name: 'Mia Rodriguez', email: 'mia.rodriguez@example.com', phone: '+1234567815', department: 'Sales', position: 'Business Development', createdAt: new Date().toISOString() },
                    { id: 27, name: 'Logan Anderson', email: 'logan.anderson@example.com', phone: '+1234567816', department: 'IT', position: 'Database Administrator', createdAt: new Date().toISOString() },
                    { id: 28, name: 'Zoe Thompson', email: 'zoe.thompson@example.com', phone: '+1234567817', department: 'Finance', position: 'Tax Specialist', createdAt: new Date().toISOString() },
                    { id: 29, name: 'Mason Lee', email: 'mason.lee@example.com', phone: '+1234567818', department: 'HR', position: 'Compensation Analyst', createdAt: new Date().toISOString() },
                    { id: 30, name: 'Layla Johnson', email: 'layla.johnson@example.com', phone: '+1234567819', department: 'Management', position: 'Operations Manager', createdAt: new Date().toISOString() }
                ];
                setUsers(sampleUsers);
                localStorage.setItem('crudUsers', JSON.stringify(sampleUsers));
            }
        } catch (error) {
            console.error('Error loading users from storage:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveUsersToStorage = (userData) => {
        try {
            localStorage.setItem('crudUsers', JSON.stringify(userData));
            setUsers(userData);
        } catch (error) {
            console.error('Error saving users to storage:', error);
        }
    };

    const createUser = (userData) => {
        const newUser = {
            id: Math.max(...users.map(u => u.id), 0) + 1,
            ...userData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const updatedUsers = [...users, newUser];
        saveUsersToStorage(updatedUsers);
        return newUser;
    };

    const updateUser = (id, userData) => {
        const updatedUsers = users.map(user => 
            user.id === parseInt(id) 
                ? { ...user, ...userData, updatedAt: new Date().toISOString() }
                : user
        );
        saveUsersToStorage(updatedUsers);
        return updatedUsers.find(user => user.id === parseInt(id));
    };

    const deleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== parseInt(id));
        saveUsersToStorage(updatedUsers);
        return true;
    };

    const getUserById = (id) => {
        return users.find(user => user.id === parseInt(id));
    };

    const searchUsers = (keyword, department = '', page = 1, pageSize = 10) => {
        let filteredUsers = [...users];

        if (keyword) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(keyword.toLowerCase()) ||
                user.email.toLowerCase().includes(keyword.toLowerCase()) ||
                user.phone.includes(keyword) ||
                user.position.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        if (department) {
            filteredUsers = filteredUsers.filter(user =>
                user.department.toLowerCase() === department.toLowerCase()
            );
        }

        const totalItems = filteredUsers.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        return {
            users: paginatedUsers,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                pageSize,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    };

    const getDepartments = () => {
        const departments = [...new Set(users.map(user => user.department))];
        return departments.sort();
    };

    const value = {
        users,
        loading,
        createUser,
        updateUser,
        deleteUser,
        getUserById,
        searchUsers,
        getDepartments,
        loadUsersFromStorage
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
