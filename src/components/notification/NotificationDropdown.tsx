import React from 'react';
import { motion } from 'framer-motion';
import { useNotificationStore } from '../../store/useNotificationStore';
import { NotificationItem } from './NotificationItem';
import { markNotificationAsRead, markAllNotificationsAsRead, fetchNotifications } from '../../services/notificationApi';

export const NotificationDropdown: React.FC = () => {
  const {
    notifications,
    hasMore,
    page,
    isLoading,
    markAsRead,
    markAllAsRead,
    appendNotifications,
    incrementPage,
    setLoading,
  } = useNotificationStore();

  const handleMarkAsRead = async (id: string) => {
    markAsRead(id);
    try {
      await markNotificationAsRead(id);
    } catch {
      // Already updated locally
    }
  };

  const handleMarkAllAsRead = async () => {
    markAllAsRead();
    try {
      await markAllNotificationsAsRead();
    } catch {
      // Already updated locally
    }
  };

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchNotifications(nextPage);
      appendNotifications(data.items, nextPage * 20 < data.totalCount);
      incrementPage();
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            No notifications yet
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleMarkAsRead}
              />
            ))}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="w-full px-4 py-3 text-xs text-blue-600 hover:bg-gray-50 font-medium disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Load more'}
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};
