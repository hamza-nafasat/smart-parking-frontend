import React from 'react';
import toast from 'react-hot-toast';
import { IoNotificationsOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { 
  useGetMyNotificationsQuery, 
  useMarkAsReadMutation, 
  useMarkAllAsReadMutation 
} from '../../../redux/apis/notificationApis';
import Loader from '../../../components/shared/small/Loader';

const Notifications = () => {
  const { data, isLoading } = useGetMyNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const handleMarkAll = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleMarkOne = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  if (isLoading) return <Loader />;

  const notifications = data?.data || [];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <IoNotificationsOutline className="text-primary" />
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">Stay updated with your booking alerts</p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button
            onClick={handleMarkAll}
            className="flex items-center gap-2 text-primary font-semibold hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors"
          >
            <IoCheckmarkDoneOutline size={20} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <IoNotificationsOutline size={48} className="mb-4 opacity-20" />
            <p className="text-lg">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-start gap-4 p-5 transition-colors hover:bg-gray-50/50 ${
                  !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className={`mt-1 p-2 rounded-full ${
                  notification.type === 'extension' ? 'bg-blue-100 text-blue-600' : 
                  notification.type === 'reassignment' ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <IoNotificationsOutline size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      notification.type === 'extension' ? 'text-blue-600' : 
                      notification.type === 'reassignment' ? 'text-purple-600' :
                      'text-amber-600'
                    }`}>
                      {notification.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className={`text-gray-800 ${!notification.read ? 'font-semibold' : 'font-normal'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    {notification.slot && (
                      <span className="bg-gray-100 px-2 py-1 rounded">Slot: {notification.slot.id}</span>
                    )}
                    {notification.booking && (
                      <span className="bg-gray-100 px-2 py-1 rounded">Booking ID: {notification.booking._id.slice(-6)}</span>
                    )}
                  </div>
                </div>

                {!notification.read && (
                  <button
                    onClick={() => handleMarkOne(notification._id)}
                    title="Mark as read"
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
                  >
                    <IoCheckmarkDoneOutline size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
