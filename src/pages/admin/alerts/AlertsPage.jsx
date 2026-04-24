import React, { useState } from 'react';
import { FiBell, FiSettings, FiActivity } from 'react-icons/fi';
import AlertLogList from './components/AlertLogList';
import AllAlerts from './components/AllAlerts';
import RuleEnginePage from './components/RuleEnginePage';

const AlertsPage = () => {
  const [activeTab, setActiveTab] = useState('configs');

  const tabs = [
    // { id: 'history', label: 'Alert History', icon: <FiBell /> },
    { id: 'configs', label: 'Sensor Alerts', icon: <FiActivity /> },
    { id: 'rules', label: 'Rule Engine', icon: <FiSettings /> },
  ];

  return (
    <div className=" font-nunito animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl shadow-sm">
            <FiActivity />
          </div>
          Alert Management
        </h1>
        <p className="text-slate-500 mt-2">
          Monitor sensor alerts and configure automated notification rules targetted at floors or sensor types.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
              activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="animate-in slide-in-from-bottom-4 duration-300">
        {/* {activeTab === 'history' && <AlertLogList />} */}
        {activeTab === 'configs' && <AllAlerts />}
        {activeTab === 'rules' && <RuleEnginePage />}
      </div>
    </div>
  );
};

export default AlertsPage;
