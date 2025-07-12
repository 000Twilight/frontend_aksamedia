// @ts-nocheck
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useState } from "react";
import { getUserInitials } from "../../utils/helpers";

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getUserById, deleteUser } = useData();
    const [isDeleting, setIsDeleting] = useState(false);
    
    const user = getUserById(id);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    {/* User not found icon */}
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-4v4m0 0l-3-3m3 3l3-3" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">User not found</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Sorry, we couldn't find the user you're looking for.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/users"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            ← Back to Users
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}? This can't be undone!`);
        
        if (confirmDelete) {
            setIsDeleting(true);
            try {
                deleteUser(id);
                navigate('/users', { 
                    replace: true,
                    state: { message: 'User deleted successfully!' }
                });
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Something went wrong while deleting the user');
                setIsDeleting(false);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header section with user info */}
                <div className="mb-8">
                    {/* Breadcrumb navigation */}
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    to="/users"
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Users
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{user.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    
                    {/* User profile header */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* User info section - takes up 2/3 of the space */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {/* Avatar with initials */}
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {getUserInitials(user?.name || 'User')}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">{user.position}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {user.department}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action buttons section - takes up 1/3 of the space */}
                        <div className="lg:col-span-1">
                            <div className="flex lg:justify-end items-center space-x-3">
                                <Link
                                    to={`/users/${user.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact and work info - takes up 2/3 of the space */}
                    <div className="lg:col-span-2">
                        {/* Contact Information Card */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</div>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-white">{user.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</div>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</div>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {user.phone}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</div>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-white">#{user.id}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Work Information Card */}
                        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                                    Work Information
                                </h3>
                                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</div>
                                        <div className="mt-1">
                                            <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {user.department}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</div>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-white">{user.position}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with system info and actions */}
                    <div className="lg:col-span-1">
                        {/* System Info Card */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                                    System Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</div>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(user.createdAt)}</div>
                                    </div>
                                    {user.updatedAt && (
                                        <div>
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Last updated</div>
                                            <div className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(user.updatedAt)}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                                    Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <Link
                                        to={`/users/${user.id}/edit`}
                                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit User
                                    </Link>
                                    <button
                                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Email
                                    </button>
                                    <button
                                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
