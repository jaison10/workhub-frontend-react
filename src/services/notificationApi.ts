import type { PaginatedNotifications } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export async function fetchNotifications(
  token: string,
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedNotifications> {
  const res = await fetch(
    `${API_URL}/api/notifications?page=${page}&pageSize=${pageSize}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function fetchUnreadCount(token: string): Promise<{ count: number }> {
  const res = await fetch(`${API_URL}/api/notifications/unread-count`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch unread count');
  return res.json();
}

export async function markNotificationAsRead(token: string, id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/notifications/${id}/read`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to mark notification as read');
}

export async function markAllNotificationsAsRead(token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/notifications/read-all`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to mark all notifications as read');
}
