import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Profile from './Profile';
import ChangePassword from '../../../components/shared/large/ChangePassword';
import Configuration from '../../../components/shared/large/Configuration';

const tabComponents = {
  profile: <Profile />,
  // subscriptions: <SubscriptionHistory />,
  password: <ChangePassword />,
  configuration: <Configuration />,
};

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab')?.toLowerCase() || 'profile';
  const [activeTab, setActiveTab] = useState(tabParam);

  const tabs = [
    { label: 'Profile', value: 'profile' },
    // { label: 'Subscriptions History', value: 'subscriptions' },
    { label: 'Change Password', value: 'password' },
    { label: 'Configuration', value: 'configuration' },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchParams({ tab: value }); // update url query
    navigate(`?tab=${value}`, { replace: true });
  };

  useEffect(() => {
    if (tabParam !== activeTab) setActiveTab(tabParam);
  }, [tabParam]);

  return (
    <section className="rounded-[15px] bg-white p-4 lg:p-6">
      <div className="flex flex-wrap items-center gap-4">
        {tabs.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleTabChange(value)}
            className={`rounded-md px-5 py-3 text-base font-semibold transition-all duration-150 ${
              activeTab === value ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 md:mt-5">{tabComponents[activeTab] || <Profile />}</div>
    </section>
  );
};

export default Settings;
