import React from 'react';
import DataTable from 'react-data-table-component';
// import { useGetAlertLogsQuery, useDeleteAlertLogMutation } from '../../../redux/apis/alertApis';
import { FiTrash2, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
// import { tableStyles } from '../../../components/shared/small/dataTableStyles';
import toast from 'react-hot-toast';
import { useGetAlertLogsQuery, useDeleteAlertLogMutation } from '../../../../redux/apis/alertApis';
import { tableStyles } from '../../../../components/shared/small/dataTableStyles';

const AlertLogList = () => {
  const { data: logsData, isLoading } = useGetAlertLogsQuery();
  const [deleteLog] = useDeleteAlertLogMutation();

  const handleDelete = async (id) => {
    try {
      await deleteLog(id).unwrap();
      toast.success('Log entry deleted');
    } catch (err) {
      toast.error('Failed to delete log');
    }
  };

  const columns = [
    {
      name: 'Severity',
      width: '100px',
      cell: (row) => {
        if (row.message.includes('CRITICAL')) return <FiAlertCircle className="text-red-500 text-xl" />;
        if (row.message.includes('WARNING')) return <FiAlertTriangle className="text-yellow-500 text-xl" />;
        return <FiInfo className="text-blue-500 text-xl" />;
      },
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
      width: '120px',
      cell: (row) => {
        const bgColor = row.type === 'SIMPLE' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700';
        return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${bgColor}`}>{row.type}</span>;
      },
    },
    {
      name: 'Sensor ID',
      selector: (row) => row.sensorUniqueId,
      sortable: true,
      cell: (row) => <span className="font-mono text-sm">{row.sensorUniqueId}</span>,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      sortable: true,
      grow: 2,
      cell: (row) => <span className="font-medium text-slate-700">{row.message}</span>,
    },
    {
      name: 'Trigger Value',
      selector: (row) => row.triggeredValue,
      sortable: true,
      width: '150px',
      cell: (row) => <span className="capitalize">{row.triggeredValue}</span>,
    },
    {
      name: 'Time',
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => <span className="text-sm text-slate-500">{new Date(row.createdAt).toLocaleString()}</span>,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Delete log entry"
        >
          <FiTrash2 />
        </button>
      ),
      button: true,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <DataTable
        columns={columns}
        data={logsData?.alerts || []}
        isLoading={isLoading}
        pagination
        customStyles={tableStyles}
        noDataComponent={<div className="p-8 text-slate-400 italic">No alerts logged yet.</div>}
        highlightOnHover
      />
    </div>
  );
};

export default AlertLogList;
