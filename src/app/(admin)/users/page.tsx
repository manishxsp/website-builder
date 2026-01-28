'use client';

import { useEffect, useState } from 'react';
import { Users, Shield, Edit, Trash2, Key, Plus, Search, CheckCircle, XCircle, Link as LinkIcon } from 'lucide-react';

interface Site {
    id: string;
    name: string;
    subdomain: string | null;
    customDomain: string | null;
}

interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    sites: Site[];
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [allSites, setAllSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignSiteModal, setShowAssignSiteModal] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        role: 'customer',
        isActive: true,
    });
    const [createForm, setCreateForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
    });
    const [passwordForm, setPasswordForm] = useState({
        password: '',
        confirmPassword: '',
    });
    const [selectedSiteIds, setSelectedSiteIds] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchAllSites();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllSites = async () => {
        try {
            const response = await fetch('/api/sites');
            if (response.ok) {
                const data = await response.json();
                setAllSites(data);
            }
        } catch (error) {
            console.error('Failed to fetch sites:', error);
        }
    };

    const openCreateModal = () => {
        setCreateForm({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
        });
        setShowCreateModal(true);
        setError('');
        setSuccess('');
    };

    const openAssignSiteModal = (user: User) => {
        setSelectedUser(user);
        setSelectedSiteIds(user.sites.map(s => s.id));
        setShowAssignSiteModal(true);
        setError('');
        setSuccess('');
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name || '',
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        });
        setShowEditModal(true);
        setError('');
        setSuccess('');
    };

    const openPasswordModal = (user: User) => {
        setSelectedUser(user);
        setPasswordForm({ password: '', confirmPassword: '' });
        setShowPasswordModal(true);
        setError('');
        setSuccess('');
    };

    const handleCreateUser = async () => {
        if (createForm.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (createForm.password !== createForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!createForm.email) {
            setError('Email is required');
            return;
        }

        setSaving(true);
        setError('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: createForm.name,
                    email: createForm.email,
                    password: createForm.password,
                    role: createForm.role,
                }),
            });

            if (response.ok) {
                setSuccess('User created successfully!');
                await fetchUsers();
                setTimeout(() => {
                    setShowCreateModal(false);
                    setSuccess('');
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to create user');
            }
        } catch (error) {
            setError('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    const handleAssignSites = async () => {
        if (!selectedUser) return;

        setSaving(true);
        setError('');

        try {
            // Update each site's userId
            const promises = allSites.map(async (site) => {
                const shouldBeAssigned = selectedSiteIds.includes(site.id);
                const isCurrentlyAssigned = selectedUser.sites.some(s => s.id === site.id);

                if (shouldBeAssigned && !isCurrentlyAssigned) {
                    // Assign site to user
                    return fetch(`/api/sites/${site.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: selectedUser.id }),
                    });
                } else if (!shouldBeAssigned && isCurrentlyAssigned) {
                    // Unassign site from user
                    return fetch(`/api/sites/${site.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: null }),
                    });
                }
            });

            await Promise.all(promises.filter(Boolean));
            setSuccess('Sites assigned successfully!');
            await fetchUsers();
            setTimeout(() => {
                setShowAssignSiteModal(false);
                setSuccess('');
            }, 1500);
        } catch (error) {
            setError('Failed to assign sites');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;

        setSaving(true);
        setError('');

        try {
            const response = await fetch(`/api/users/${selectedUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });

            if (response.ok) {
                setSuccess('User updated successfully!');
                await fetchUsers();
                setTimeout(() => {
                    setShowEditModal(false);
                    setSuccess('');
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update user');
            }
        } catch (error) {
            setError('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!selectedUser) return;

        if (passwordForm.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (passwordForm.password !== passwordForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setSaving(true);
        setError('');

        try {
            const response = await fetch(`/api/users/${selectedUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordForm.password }),
            });

            if (response.ok) {
                setSuccess('Password changed successfully!');
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setSuccess('');
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to change password');
            }
        } catch (error) {
            setError('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchUsers();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete user');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 font-jakarta">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3 font-outfit tracking-tight">
                        <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        User Management
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg">Manage your team and customers efficiently</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm"
                        />
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-medium transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus className="w-5 h-5" />
                        Create User
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
                            <p className="text-4xl font-bold text-gray-900 mt-2 font-outfit">{users.length}</p>
                        </div>
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                            <Users className="w-7 h-7 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
                        <span className="bg-green-50 px-2 py-1 rounded-lg">Active Now</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Admins</p>
                            <p className="text-4xl font-bold text-gray-900 mt-2 font-outfit">
                                {users.filter(u => u.role === 'admin').length}
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center shadow-inner">
                            <Shield className="w-7 h-7 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-purple-600 font-medium">
                        <span className="bg-purple-50 px-2 py-1 rounded-lg">System Access</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Customers</p>
                            <p className="text-4xl font-bold text-gray-900 mt-2 font-outfit">
                                {users.filter(u => u.role === 'customer').length}
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-inner">
                            <Users className="w-7 h-7 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-blue-600 font-medium">
                        <span className="bg-blue-50 px-2 py-1 rounded-lg">Site Owners</span>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">
                                    User Details
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">
                                    Sites
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">
                                    Joined
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-gray-900">{user.name || 'No Name'}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${user.role === 'admin'
                                            ? 'bg-purple-50 text-purple-700 border-purple-100'
                                            : 'bg-blue-50 text-blue-700 border-blue-100'
                                            }`}>
                                            {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                                                <XCircle className="w-3 h-3" />
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.sites.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {user.sites.map(site => (
                                                    <span key={site.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                        {site.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">No sites assigned</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Edit User"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openPasswordModal(user)}
                                                className="text-gray-400 hover:text-green-600 p-2 hover:bg-green-50 rounded-lg transition-all"
                                                title="Change Password"
                                            >
                                                <Key className="w-4 h-4" />
                                            </button>
                                            {user.role === 'customer' && (
                                                <button
                                                    onClick={() => openAssignSiteModal(user)}
                                                    className="text-gray-400 hover:text-purple-600 p-2 hover:bg-purple-50 rounded-lg transition-all"
                                                    title="Assign Sites"
                                                >
                                                    <LinkIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit User</h3>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {success}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={editForm.isActive}
                                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                                    Account is active
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateUser}
                                disabled={saving}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {showPasswordModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Changing password for: <strong>{selectedUser.email}</strong>
                        </p>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {success}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.password}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Min 6 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Re-enter password"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleChangePassword}
                                disabled={saving}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                            >
                                {saving ? 'Changing...' : 'Change Password'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Create New User</h3>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {success}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={createForm.name}
                                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={createForm.email}
                                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                <input
                                    type="password"
                                    value={createForm.password}
                                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Min 6 characters"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                                <input
                                    type="password"
                                    value={createForm.confirmPassword}
                                    onChange={(e) => setCreateForm({ ...createForm, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Re-enter password"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={createForm.role}
                                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateUser}
                                disabled={saving}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                            >
                                {saving ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Sites Modal */}
            {showAssignSiteModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Assign Sites</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Managing sites for: <strong>{selectedUser.email}</strong>
                        </p>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {success}
                            </div>
                        )}

                        <div className="space-y-2 mb-6">
                            {allSites.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No sites available</p>
                            ) : (
                                allSites.map((site) => (
                                    <label
                                        key={site.id}
                                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedSiteIds.includes(site.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedSiteIds([...selectedSiteIds, site.id]);
                                                } else {
                                                    setSelectedSiteIds(selectedSiteIds.filter(id => id !== site.id));
                                                }
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div className="ml-3 flex-1">
                                            <div className="text-sm font-medium text-gray-900">{site.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {site.customDomain || `/${site.subdomain}`}
                                            </div>
                                        </div>
                                    </label>
                                ))
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAssignSiteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignSites}
                                disabled={saving}
                                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Assign Sites'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
