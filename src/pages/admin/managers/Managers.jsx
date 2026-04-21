import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  useGetManagersQuery,
  useCreateManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
} from '../../../redux/apis/userApis';
import { useSelector } from 'react-redux';

function Managers() {
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useGetManagersQuery(
    { page },
    {
      skip: !user || user.role !== 'admin',
    }
  );

  const [createManager, { isLoading: creating }] = useCreateManagerMutation();
  const [updateManager, { isLoading: updating }] = useUpdateManagerMutation();
  const [deleteManager] = useDeleteManagerMutation();

  const managers = data?.data || [];
  const total = data?.total || 0;

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    nationality: '',
    role: 'manager',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const openAdd = () => {
    setIsEdit(false);
    setSelected(null);
    setForm({
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      nationality: '',
      role: 'manager',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const openEdit = (row) => {
    setIsEdit(true);
    setSelected(row);
    setForm({
      fullName: row.fullName || '',
      email: row.email || '',
      password: '',
      phoneNumber: row.phoneNumber || '',
      nationality: row.nationality || '',
      role: 'manager',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.fullName.trim()) {
      setErrorMessage('Full name is required');
      return;
    }

    if (!isEdit && !form.email.trim()) {
      setErrorMessage('Email is required');
      return;
    }

    if (!isEdit && !form.password) {
      setErrorMessage('Password is required for new manager');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isEdit && !emailRegex.test(form.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      if (isEdit) {
        // Only send fields that backend accepts for update
        const updateData = {
          id: selected._id,
          fullName: form.fullName,
          phoneNumber: form.phoneNumber,
          nationality: form.nationality,
        };

        // Only include password if provided
        if (form.password && form.password.trim()) {
          if (form.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
          }
          updateData.password = form.password;
        }

        await updateManager(updateData).unwrap();
      } else {
        // Create new manager
        if (form.password.length < 6) {
          setErrorMessage('Password must be at least 6 characters');
          return;
        }

        await createManager({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          nationality: form.nationality,
          role: 'manager',
        }).unwrap();
      }
      setShowModal(false);
      refetch(); // Refresh the list
    } catch (err) {
      setErrorMessage(err?.data?.message || 'Error processing request');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete manager "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteManager(id).unwrap();
      refetch(); // Refresh the list
    } catch (err) {
      alert(err?.data?.message || 'Error deleting manager');
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.fullName,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Phone',
      selector: (row) => row.phoneNumber || '-',
      grow: 1.5,
    },
    {
      name: 'Nationality',
      selector: (row) => row.nationality || '-',
      grow: 1,
    },
    {
      name: 'Created At',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      grow: 1,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id, row.fullName)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      ),
      grow: 1,
    },
  ];

  // Loading and access control
  if (!user) return <div className="p-6">Checking authentication...</div>;

  if (user.role !== 'admin') {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Access Denied: Admin privileges required
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading managers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading managers. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Managers</h2>
          <p className="text-gray-600 mt-1">Manage system managers and their permissions</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Manager
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DataTable
          columns={columns}
          data={managers}
          pagination
          paginationServer
          paginationTotalRows={total}
          onChangePage={(p) => setPage(p)}
          onChangeRowsPerPage={() => setPage(1)}
          highlightOnHover
          pointerOnHover
          responsive
          noDataComponent="No managers found"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {isEdit ? 'Edit Manager' : 'Add New Manager'}
              </h3>

              {errorMessage && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email {!isEdit && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    disabled={isEdit}
                  />
                  {isEdit && <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password {!isEdit && <span className="text-red-500">*</span>}
                    {isEdit && <span className="text-xs text-gray-500"> (optional)</span>}
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={isEdit ? 'Enter new password (optional)' : 'Enter password'}
                  />
                  {!isEdit && <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    placeholder="Enter nationality"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={creating || updating}
                  className="px-4 py-2 bg-primary hover:bg-[#21ceac] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating || updating ? 'Processing...' : isEdit ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Managers;
