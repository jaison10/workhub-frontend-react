import React from 'react';
import { Briefcase, CheckCircle, XCircle, FileText } from 'lucide-react';
import type { Notification, NotificationType } from '../../types';
import { timeAgo } from '../../utils/timeAgo';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

const iconMap: Record<NotificationType, React.ElementType> = {
  JobRequestReceived: Briefcase,
  JobRequestAccepted: CheckCircle,
  JobRequestDeclined: XCircle,
  JobApplicationReceived: FileText,
};

const iconColorMap: Record<NotificationType, string> = {
  JobRequestReceived: 'text-blue-500',
  JobRequestAccepted: 'text-green-500',
  JobRequestDeclined: 'text-red-500',
  JobApplicationReceived: 'text-purple-500',
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
  const Icon = iconMap[notification.type] ?? FileText;
  const iconColor = iconColorMap[notification.type] ?? 'text-gray-500';

  const handleClick = () => {
    if (!notification.isRead) {
      onRead(notification.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
        notification.isRead ? 'bg-white' : 'bg-blue-50'
      }`}
    >
      <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${notification.isRead ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
          {notification.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-1">{timeAgo(notification.createdAt)}</p>
      </div>
      {!notification.isRead && (
        <div className="mt-2 flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </button>
  );
};
