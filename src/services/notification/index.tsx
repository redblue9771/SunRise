// Mock data
import notifications, { Notif } from 'data/notifications';
type getNotificationsType = {
  notifications: Notif[];
  notificationsCount: number;
};
export const getNotifications = (
  limit: number = 6
): Promise<getNotificationsType> => {
  return new Promise<getNotificationsType>(resolve => {
    setTimeout(() => {
      resolve({
        notifications: notifications.slice(0, limit),
        notificationsCount: notifications.length
      });
    }, 700);
  });
};
