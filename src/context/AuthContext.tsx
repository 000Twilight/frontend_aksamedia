// @ts-nocheck
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        if (!username || !password) {
            return { success: false, error: 'Please fill in all fields' };
        }

        if (password !== 'Aksamedia') {
            return { success: false, error: 'Invalid password. Use "Aksamedia"' };
        }

        let displayName;
        let email;

        if (username.includes('@')) {
            const nameFromEmail = username.split('@')[0];
            displayName = nameFromEmail
                .replace(/[._-]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            email = username;
        } else {
            displayName = username
                .replace(/[._-]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            email = username + '@aksamedia.local';
        }

        // Determine user role based on username
        let role = 'user';
        if (username.toLowerCase().includes('admin')) {
            role = 'admin';
        } else if (username.toLowerCase().includes('demo')) {
            role = 'demo';
        } else if (username.toLowerCase().includes('manager')) {
            role = 'manager';
        }

        const userData = {
            email: email,
            name: displayName,
            username: username,
            role: role,
            loginTime: new Date().toISOString()
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const updateUserProfile = (profileData) => {
        if (user) {
            const updatedUser = {
                ...user,
                ...profileData,
                updatedAt: new Date().toISOString()
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        }
        return null;
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated,
        updateUserProfile,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
