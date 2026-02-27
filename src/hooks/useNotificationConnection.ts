import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useToastStore } from '../store/useToastStore';
import { signalRService } from '../services/signalRService';
import { fetchNotifications, fetchUnreadCount } from '../services/notificationApi';

export function useNotificationConnection() {
  const { isAuthenticated } = useAuthStore();
  const {
    setNotifications,
    addNotification,
    setUnreadCount,
    setConnected,
    setLoading,
    reset,
  } = useNotificationStore();
  const { showToast } = useToastStore();
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      if (connectedRef.current) {
        signalRService.stop();
        reset();
        connectedRef.current = false;
      }
      return;
    }

    const connect = async () => {
      try {
        setLoading(true);

        signalRService.buildConnection();

        signalRService.onReceiveNotification((notification) => {
          addNotification(notification);
          showToast(notification.title, 'info');
        });

        signalRService.onUpdateUnreadCount((count) => {
          setUnreadCount(count);
        });

        signalRService.onReconnecting(() => {
          setConnected(false);
        });

        signalRService.onReconnected(async () => {
          setConnected(true);
          try {
            const countData = await fetchUnreadCount();
            setUnreadCount(countData.count);
            const data = await fetchNotifications(1);
            setNotifications(data.items);
          } catch {
            // Silently handle re-fetch errors on reconnect
          }
        });

        signalRService.onClose(() => {
          setConnected(false);
          connectedRef.current = false;
        });

        await signalRService.start();
        setConnected(true);
        connectedRef.current = true;

        const [countData, notifData] = await Promise.all([
          fetchUnreadCount(),
          fetchNotifications(1),
        ]);
        setUnreadCount(countData.count);
        setNotifications(notifData.items);
      } catch {
        setConnected(false);
      } finally {
        setLoading(false);
      }
    };

    connect();

    return () => {
      signalRService.stop();
      connectedRef.current = false;
    };
  }, [isAuthenticated]);
}
