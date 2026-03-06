import * as signalR from '@microsoft/signalr';
import type { Notification } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

class SignalRService {
  private connection: signalR.HubConnection | null = null;

  buildConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/hubs/notifications`, {
        withCredentials: true,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  async start(): Promise<void> {
    if (!this.connection) throw new Error('Connection not built. Call buildConnection first.');
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      await this.connection.start();
    }
  }

  async stop(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  onReceiveNotification(callback: (notification: Notification) => void): void {
    this.connection?.on('ReceiveNotification', callback);
  }

  onUpdateUnreadCount(callback: (count: number) => void): void {
    this.connection?.on('UpdateUnreadCount', callback);
  }

  onReconnecting(callback: () => void): void {
    this.connection?.onreconnecting(() => callback());
  }

  onReconnected(callback: () => void): void {
    this.connection?.onreconnected(() => callback());
  }

  onClose(callback: () => void): void {
    this.connection?.onclose(() => callback());
  }

  getState(): signalR.HubConnectionState | null {
    return this.connection?.state ?? null;
  }
}

export const signalRService = new SignalRService();
