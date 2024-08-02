import { NotificationType } from "../types/notification";


export function unReadNotifitcation(notifications: NotificationType[]) {
    return notifications.filter((notification) => notification.isReadMessage === false);
}