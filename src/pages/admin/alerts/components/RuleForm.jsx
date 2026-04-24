import React, { useState, useEffect } from 'react';
// import { useCreateRuleMutation, useUpdateRuleMutation } from '../../../redux/apis/alertApis';
import { FiX, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCreateRuleMutation, useUpdateRuleMutation } from '../../../../redux/apis/alertApis';

const RuleForm = ({ rule, onClose }) => {
  const [createRule, { isLoading: isCreating }] = useCreateRuleMutation();
  const [updateRule, { isLoading: isUpdating }] = useUpdateRuleMutation();

  const [formData, setFormData] = useState({
    name: '',
    sensorType: 'ultraSonicSensor',
    targetField: 'distance',
    operator: '>',
    thresholdValue: '',
    severity: 'INFO',
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        sensorType: rule.sensorType,
        targetField: rule.targetField,
        operator: rule.operator,
        thresholdValue: rule.thresholdValue,
        severity: rule.severity,
      });
    }
  }, [rule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rule) {
        await updateRule({ id: rule.id, ...formData }).unwrap();
        toast.success('Rule updated successfully');
      } else {
        await createRule(formData).unwrap();
        toast.success('Rule created successfully');
      }
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const fieldOptions = {
    ultraSonicSensor: ['distance', 'rawValue', 'batteryLevel', 'signalStrength', 'statusCode'],
    cameraSensor: ['duration', 'metadata.battery', 'metadata.temperature'],
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">{rule ? 'Edit Rule' : 'New Rule'}</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Rule Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Low Distance Alert"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Sensor Type</label>
              <select
                name="sensorType"
                value={formData.sensorType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="ultraSonicSensor">Ultrasonic</option>
                <option value="cameraSensor">Camera</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="INFO">Info</option>
                <option value="WARNING">Warning</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Target Field</label>
            <select
              name="targetField"
              value={formData.targetField}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {fieldOptions[formData.sensorType].map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Operator</label>
              <select
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value=">">&gt; (Greater than)</option>
                <option value="<">&lt; (Less than)</option>
                <option value="==">== (Equals)</option>
                <option value="!=">!= (Not equals)</option>
                <option value=">=">&gt;= (Greater or equal)</option>
                <option value="<=">&lt;= (Less or equal)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Threshold</label>
              <input
                type="number"
                step="0.01"
                name="thresholdValue"
                value={formData.thresholdValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCreating || isUpdating ? (
                'Saving...'
              ) : (
                <>
                  <FiCheck /> {rule ? 'Update Rule' : 'Save Rule'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RuleForm;
