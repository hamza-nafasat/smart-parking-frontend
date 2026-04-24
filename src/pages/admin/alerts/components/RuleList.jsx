import React from 'react';
import DataTable from 'react-data-table-component';
// import { useGetRulesQuery, useDeleteRuleMutation, useUpdateRuleMutation } from '../../../redux/apis/alertApis';
import { FiEdit2, FiTrash2, FiPlus, FiActivity } from 'react-icons/fi';
// import { tableStyles } from '../../../components/shared/small/dataTableStyles';
import toast from 'react-hot-toast';
import { useGetRulesQuery, useDeleteRuleMutation, useUpdateRuleMutation } from '../../../../redux/apis/alertApis';
import { tableStyles } from '../../../../components/shared/small/dataTableStyles';

const RuleList = ({ onEdit, onAdd }) => {
  const { data: rulesData, isLoading } = useGetRulesQuery();
  const [deleteRule] = useDeleteRuleMutation();
  const [updateRule] = useUpdateRuleMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      try {
        await deleteRule(id).unwrap();
        toast.success('Rule deleted');
      } catch (err) {
        toast.error('Failed to delete rule');
      }
    }
  };

  const toggleStatus = async (rule) => {
    try {
      await updateRule({ id: rule.id, isActive: !rule.isActive }).unwrap();
      toast.success(`Rule ${rule.isActive ? 'disabled' : 'enabled'}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div className="font-bold text-emerald-700">{row.name}</div>,
    },
    {
      name: 'Sensor Type',
      selector: (row) => row.sensorType,
      sortable: true,
      cell: (row) => (row.sensorType === 'ultraSonicSensor' ? 'Ultrasonic' : 'Camera'),
    },
    {
      name: 'Condition',
      cell: (row) => (
        <div className="font-mono">
          <span className="text-slate-500">{row.targetField}</span>{' '}
          <span className="text-emerald-500 font-bold">{row.operator}</span>{' '}
          <span className="text-slate-800">{row.thresholdValue}</span>
        </div>
      ),
      grow: 1.5,
    },
    {
      name: 'Severity',
      selector: (row) => row.severity,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            row.severity === 'CRITICAL'
              ? 'bg-red-100 text-red-600'
              : row.severity === 'WARNING'
                ? 'bg-amber-100 text-amber-600'
                : 'bg-emerald-100 text-emerald-600'
          }`}
        >
          {row.severity}
        </span>
      ),
    },
    {
      name: 'Status',
      center: true,
      cell: (row) => (
        <button
          onClick={() => toggleStatus(row)}
          className={`w-12 h-6 flex items-center rounded-full px-1 transition-all mx-auto ${
            row.isActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
          }`}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </button>
      ),
    },
    {
      name: 'Actions',
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row)}
            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Dynamic Rules</h2>
          <p className="text-slate-500 text-sm">Define custom thresholds and conditions for alerts</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md shadow-emerald-100"
        >
          <FiPlus /> Create Rule
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={rulesData?.data || []}
          progressPending={isLoading}
          pagination
          customStyles={tableStyles}
          highlightOnHover
          noDataComponent={
            <div className="p-12 text-center text-slate-400">
              <FiActivity className="mx-auto text-4xl mb-2 opacity-20" />
              <p>No custom rules defined yet.</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default RuleList;
