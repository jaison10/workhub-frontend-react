import type { PaginatedNotifications } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export async function fetchNotifications(
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedNotifications> {
  const res = await fetch(
    `${API_URL}/api/notifications?page=${page}&pageSize=${pageSize}`,
    { credentials: 'include' }
  );
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function fetchUnreadCount(): Promise<{ count: number }> {
  const res = await fetch(`${API_URL}/api/notifications/unread-count`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch unread count');
  return res.json();
}

export async function markNotificationAsRead(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/notifications/${id}/read`, {
    method: 'PUT',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to mark notification as read');
}

export async function markAllNotificationsAsRead(): Promise<void> {
  const res = await fetch(`${API_URL}/api/notifications/read-all`, {
    method: 'PUT',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to mark all notifications as read');
}
