import type { NOTIFICATION_TYPE } from 'react-notifications-component';
import { Store } from 'react-notifications-component';

/**
 * Helper for creating notifications
 */
const addNotification = (type: NOTIFICATION_TYPE, title: string, message: string) =>
  Store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 4000,
      onScreen: true,
    },
    slidingExit: {
      duration: 200,
      timingFunction: 'ease-out',
      delay: 0,
    },
  });

export default addNotification;
