import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { MdEdit, MdDelete, MdAddCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';

import Modal from '../../../../components/shared/small/Modal';
import Input from '../../../../components/shared/small/Input';
import Dropdown from '../../../../components/shared/small/Dropdown';
import ConfirmationModal from '../../../../components/shared/small/ConfirmationModal';
import { tableStyles } from '../../../../components/shared/small/dataTableStyles';

import {
  useGetAlertConfigsQuery,
  useCreateAlertConfigMutation,
  useUpdateAlertConfigMutation,
  useDeleteAlertConfigMutation,
} from '../../../../redux/apis/alertApis';

import { severityOptions, sensorTypes, SENSOR_ALERT_FIELDS } from '../../../../utils/sensorTypes';
import { initialAlertState } from '../../../../utils/alertFormHelpers';

export default function AllAlerts() {
  const { user } = useSelector((state) => state.auth);
  const [modalType, setModalType] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  const [formData, setFormData] = useState(initialAlertState);

  const { data: configsData, isLoading: loadingConfigs } = useGetAlertConfigsQuery();
  const [createConfig, { isLoading: creating }] = useCreateAlertConfigMutation();
  const [updateConfig, { isLoading: updating }] = useUpdateAlertConfigMutation();
  const [deleteConfig] = useDeleteAlertConfigMutation();

  const resetForm = () => {
    setFormData(initialAlertState);
  };

  const openAddModal = () => {
    resetForm();
    setModalType('add');
  };

  const openEditModal = (alert) => {
    setSelectedAlert(alert);
    setFormData({
      alertName: alert.name,
      alertType: alert.alertType,
      severityType: alert.severity,
      label: alert.label || '',
      min: alert.value?.min ?? alert.value ?? '',
      max: alert.value?.max ?? '',
      sensorId: alert.sensorId || '',
      platform: alert.platform,
      email: alert.email || '',
      status: alert.status || 'active',
    });
    setModalType('edit');
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedAlert(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownSelect = (name, value) => {
    if (name === 'alertType') {
      const config = SENSOR_ALERT_FIELDS[value];
      setFormData((prev) => ({
        ...prev,
        alertType: value,
        label: config?.label || '',
        min: '',
        max: '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const { alertName, alertType, severityType, label, min, max, platform, email } = formData;

    if (!alertName || !alertType || !severityType || !platform) {
      return toast.error('Please fill all required fields');
    }

    const field = SENSOR_ALERT_FIELDS[alertType];
    const alertValue = field?.type === 'range' ? { min, max } : min;

    const payload = {
      name: alertName,
      alertType,
      severity: severityType,
      label,
      value: alertValue,
      platform,
      sensorId: formData.sensorId || undefined,
      status: formData.status || 'active',
      email: platform === 'email' ? email : undefined,
    };

    try {
      if (modalType === 'add') {
        await createConfig(payload).unwrap();
        toast.success('Alert created');
      } else {
        await updateConfig({ id: selectedAlert._id, ...payload }).unwrap();
        toast.success('Alert updated');
      }
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const openDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await deleteConfig(deleteId).unwrap();
      toast.success('Alert deleted');
      setShowConfirmation(false);
    } catch (err) {
      toast.error('Failed to delete alert');
    }
  };

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Type', selector: (row) => row.alertType, sortable: true, cell: (row) => <span className="uppercase text-[10px] font-bold tracking-widest text-emerald-600">{row.alertType}</span> },
    { name: 'Severity', selector: (row) => row.severity, sortable: true, cell: (row) => <span className="capitalize text-slate-600">{row.severity}</span> },
    {
      name: 'Condition',
      cell: (row) => (
        <span className="text-sm text-slate-600 italic">
          {row.value && typeof row.value === 'object' 
            ? `${row.label}: ${row.value.min}${row.value.max ? ` - ${row.value.max}` : ''}` 
            : `${row.label}: ${String(row.value)}`}
        </span>
      ),
      grow: 1.5,
    },
    { name: 'Platform', selector: (row) => row.platform, cell: (row) => <span className="capitalize">{row.platform}</span> },
    {
      name: 'Status',
      cell: (row) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEditModal(row)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><MdEdit /></button>
          <button onClick={() => openDeleteConfirmation(row._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><MdDelete /></button>
        </div>
      ),
      width: '100px',
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Sensor Alerts</h2>
          <p className="text-slate-500 text-sm">Individual triggers based on sensor types across the platform.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-md shadow-emerald-100">
          <MdAddCircle /> Create Alert
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={configsData?.alerts || []}
          progressPending={loadingConfigs}
          pagination
          customStyles={tableStyles}
          highlightOnHover
        />
      </div>

      {showConfirmation && (
        <Modal onClose={() => setShowConfirmation(false)} title="Delete Alert" width="w-[400px]">
          <ConfirmationModal
            title="Are you sure?"
            message="This action will permanently delete this alert configuration."
            onCancel={() => setShowConfirmation(false)}
            onConfirm={handleDelete}
            confirmText="Yes, Delete"
          />
        </Modal>
      )}

      {modalType && (
        <Modal onClose={closeModal} title={modalType === 'add' ? 'Add Alert' : 'Edit Alert'} width="w-[450px]">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 custom-scroll">
            <Input label="Alert Name" name="alertName" value={formData.alertName} onChange={handleChange} placeholder="e.g. High Occupancy Warn" />
            
            <Dropdown label="Sensor Type" options={sensorTypes} value={formData.alertType} onSelect={(val) => handleDropdownSelect('alertType', val)} />
            
            <Dropdown label="Severity" options={severityOptions} value={formData.severityType} onSelect={(val) => handleDropdownSelect('severityType', val)} />
            
            <Dropdown label="Status" options={[{option: 'Active', value: 'active'}, {option: 'Inactive', value: 'inactive'}]} value={formData.status} onSelect={(val) => handleDropdownSelect('status', val)} />

            {formData.alertType && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3">
                <label className="text-sm font-bold text-slate-700">{formData.label || 'Condition'}</label>
                {(() => {
                  const field = SENSOR_ALERT_FIELDS[formData.alertType];
                  if (field.type === 'boolean') {
                    return (
                      <Dropdown options={[{option: 'True', value: true}, {option: 'False', value: false}]} value={formData.min} onSelect={(val) => setFormData(prev => ({...prev, min: val, max: null}))} />
                    );
                  }
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="number" label={`Min ${field.unit || ''}`} name="min" value={formData.min} onChange={handleChange} />
                      <Input type="number" label={`Max ${field.unit || ''}`} name="max" value={formData.max} onChange={handleChange} />
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Notification Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={formData.platform === 'email'} onChange={() => setFormData({...formData, platform: 'email'})} /> Email
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={formData.platform === 'platform'} onChange={() => setFormData({...formData, platform: 'platform'})} /> Platform
                </label>
              </div>
            </div>

            {formData.platform === 'email' && (
              <Input type="email" label="Notification Email" name="email" value={formData.email} onChange={handleChange} placeholder="user@example.com" />
            )}

            <div className="pt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} disabled={creating || updating} className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all">
                {creating || updating ? 'Saving...' : 'Save Alert'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
