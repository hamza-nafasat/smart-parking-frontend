import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { MdEdit, MdDelete, MdAddCircle } from 'react-icons/md';

import Modal from '../../../../components/shared/small/Modal';
import Input from '../../../../components/shared/small/Input';
import Dropdown from '../../../../components/shared/small/Dropdown';
import RuleDropdown from '../../../../components/shared/small/RuleDropdown';
import ConfirmationModal from '../../../../components/shared/small/ConfirmationModal';
import { tableStyles } from '../../../../components/shared/small/dataTableStyles';

import { useGetAllBuildingsQuery } from '../../../../redux/apis/buildingApis';
import { useGetAllFloorsQuery } from '../../../../redux/apis/floorApis';
import { useGetAllSensorsQuery } from '../../../../redux/apis/sensorApis';
import {
  useGetRulesQuery,
  useCreateRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} from '../../../../redux/apis/alertApis';

import { 
  createBuildingOptions, 
  createFloorOptions, 
  createSensorOptions 
} from '../../../../utils/alertFormatters';
import { initialFormState } from '../../../../utils/alertFormHelpers';
import { formatSensorType, getSensorFieldConfig, severityOptions } from '../../../../utils/sensorTypes';

export default function RuleEnginePage() {
  const [modalType, setModalType] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

  // Queries
  const { data: buildingsData } = useGetAllBuildingsQuery({ search: '' });
  const { data: floorsData } = useGetAllFloorsQuery(selectedBuilding, { skip: !selectedBuilding });
  const { data: allSensorsData } = useGetAllSensorsQuery();
  const { data: rulesData, isLoading: loadingRules } = useGetRulesQuery();

  // Mutations
  const [createRule, { isLoading: creating }] = useCreateRuleMutation();
  const [updateRule, { isLoading: updating }] = useUpdateRuleMutation();
  const [deleteRule] = useDeleteRuleMutation();

  // Derived Options
  const buildingOptions = useMemo(() => createBuildingOptions(buildingsData?.data), [buildingsData]);
  const floorOptions = useMemo(() => createFloorOptions(floorsData?.data), [floorsData]);
  
  const filteredSensors = useMemo(() => {
    if (!selectedFloor) return [];
    return (allSensorsData?.data || []).filter(s => s.floor === selectedFloor);
  }, [allSensorsData, selectedFloor]);

  const sensorOptions = useMemo(() => createSensorOptions(filteredSensors), [filteredSensors]);

  // Hierarchical State Management: Clear children when parent changes
  useEffect(() => {
    if (modalType === 'add') {
      setSelectedFloor('');
      setSelectedSensors([]);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (modalType === 'add') {
      setSelectedSensors([]);
    }
  }, [selectedFloor]);

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedBuilding('');
    setSelectedFloor('');
    setSelectedSensors([]);
  };

  const openAddModal = () => {
    resetForm();
    setModalType('add');
  };

  const openEditModal = (rule) => {
    setSelectedRule(rule);
    
    // Map sensors from Mongoose populated response
    const ruleSensors = (rule.sensors || []).map(s => ({
      id: s.id,
      name: s.name,
      type: s.type
    }));

    setFormData({
      ruleName: rule.name,
      severity: rule.severity,
      platform: rule.platform,
      email: rule.email || '',
      conditions: rule.values || {}, // Structure: { label, id, value }
      status: rule.status || 'active',
    });

    setSelectedBuilding(rule.buildingId?._id || rule.buildingId || '');
    setSelectedFloor(rule.floorId?._id || rule.floorId || '');
    setSelectedSensors(ruleSensors);
    setModalType('edit');
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRule(null);
  };

  const handleConditionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    if (!formData.ruleName || !formData.severity || !selectedBuilding || !selectedFloor || selectedSensors.length === 0) {
      return toast.error('Please fill all required fields');
    }

    // Adapt to Rule Schema: values: { label, id, value }
    const payload = {
      name: formData.ruleName,
      buildingId: selectedBuilding,
      floorId: selectedFloor,
      sensorIds: selectedSensors.map(s => s.id),
      severity: formData.severity,
      status: formData.status,
      values: {
        label: formData.conditions.label || 'Condition',
        id: formData.conditions.id || 'value_1',
        value: formData.conditions.value || {}
      },
      platform: formData.platform,
      email: formData.platform === 'email' ? formData.email : undefined,
    };

    try {
      if (modalType === 'add') {
        await createRule(payload).unwrap();
        toast.success('Rule created successfully');
      } else {
        await updateRule({ id: selectedRule._id, ...payload }).unwrap();
        toast.success('Rule updated successfully');
      }
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save rule');
    }
  };

  const columns = [
    { name: 'Rule Name', selector: row => row.name, sortable: true },
    { name: 'Building', selector: row => row.buildingName || '-', sortable: true },
    { name: 'Floor', selector: row => row.floorName || '-', sortable: true },
    {
      name: 'Sensors',
      selector: row => (row.sensors || []).map(s => s.name).join(', ') || '-',
      wrap: true,
      grow: 1.5,
    },
    { name: 'Severity', selector: row => row.severity, center: true, cell: (row) => <span className="capitalize text-xs font-bold">{row.severity}</span> },
    {
      name: 'Status',
      center: true,
      cell: (row) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <button onClick={() => openEditModal(row)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><MdEdit /></button>
          <button onClick={() => { setDeleteId(row._id); setShowConfirmation(true); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><MdDelete /></button>
        </div>
      ),
      width: '100px',
    },
  ];

  const renderSharedConditions = () => {
    // If multiple sensors are selected, we apply the same rule logic to all of them for now
    // based on the first sensor's type.
    if (selectedSensors.length === 0) return null;
    
    const sensor = selectedSensors[0];
    const field = getSensorFieldConfig(sensor.type);
    const value = formData.conditions.value || {};

    return (
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-800">Shared Condition</h4>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Applied to {selectedSensors.length} sensors</p>
        </div>

        {field.type === 'boolean' ? (
          <Dropdown
            label="Alert Trigger Value"
            options={[{option: 'Occupied', value: 'true'}, {option: 'Vacant', value: 'false'}]}
            value={String(value)}
            onSelect={val => handleConditionChange('value', val)}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label={`Min ${field.unit || ''}`}
              value={value.min || ''}
              onChange={e => handleConditionChange('value', { ...value, min: e.target.value })}
            />
            <Input
              type="number"
              label={`Max ${field.unit || ''}`}
              value={value.max || ''}
              onChange={e => handleConditionChange('value', { ...value, max: e.target.value })}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Rule Engine</h2>
          <p className="text-slate-500 text-sm">Complex logic targeted at specific geographic groups of sensors.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-md shadow-emerald-100">
          <MdAddCircle /> Create Rule
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={rulesData?.rules || []}
          progressPending={loadingRules}
          pagination
          customStyles={tableStyles}
          highlightOnHover
        />
      </div>

      {showConfirmation && (
        <Modal onClose={() => setShowConfirmation(false)} title="Delete Rule">
          <ConfirmationModal
            title="Are you sure?"
            message="This action will permanently remove this rule from your engine."
            onCancel={() => setShowConfirmation(false)}
            onConfirm={async () => {
              await deleteRule(deleteId).unwrap();
              toast.success('Rule deleted');
              setShowConfirmation(false);
            }}
          />
        </Modal>
      )}

      {modalType && (
        <Modal onClose={closeModal} title={modalType === 'add' ? 'Add Rule' : 'Edit Rule'} width="w-full max-w-2xl">
          <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 custom-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Rule Name *" name="ruleName" value={formData.ruleName} onChange={e => setFormData({...formData, ruleName: e.target.value})} />
              <Dropdown label="Severity *" options={severityOptions} value={formData.severity} onSelect={val => setFormData({...formData, severity: val})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dropdown label="Building *" options={buildingOptions} value={selectedBuilding} onSelect={val => { setSelectedBuilding(val); }} />
              <Dropdown label="Floor *" options={selectedBuilding ? floorOptions : []} value={selectedFloor} onSelect={val => { setSelectedFloor(val); }} disabled={!selectedBuilding} />
            </div>

            <RuleDropdown
              multi
              label="Select Sensors *"
              options={selectedFloor ? sensorOptions : []}
              value={selectedSensors}
              onSelect={setSelectedSensors}
              disabled={!selectedFloor}
            />

            <Dropdown label="Status" options={[{option: 'Active', value: 'active'}, {option: 'Inactive', value: 'inactive'}]} value={formData.status} onSelect={val => setFormData({...formData, status: val})} />

            {selectedSensors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Rule Condition</h3>
                <div className="grid grid-cols-1 gap-4">
                  {renderSharedConditions()}
                </div>
              </div>
            )}

            <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
              <label className="text-sm font-bold text-slate-700">Notification Platform</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={formData.platform === 'email'} onChange={() => setFormData({...formData, platform: 'email'})} /> Email</label>
                <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={formData.platform === 'platform'} onChange={() => setFormData({...formData, platform: 'platform'})} /> Platform</label>
              </div>
              {formData.platform === 'email' && (
                <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                  <Input type="email" label="Target Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              )}
            </div>

            <div className="pt-6 flex gap-3 border-t border-slate-100">
              <button onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={creating || updating} className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-100">
                {creating || updating ? 'Saving...' : modalType === 'add' ? 'Create Rule' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
