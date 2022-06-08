import { v4 as uuidv4 } from 'uuid';
import EventManager from '@services/event-manager';

const CHANNEL_NAME = 'flash-message';

export interface IMessage {
  message: string;
  id?: string;
  icon?: string;
  title?: string;
  type?: 'error' | 'info' | 'success';
  delay?: number | null;
}

/**
 * Show top flash message
 */
const showFlashMessage = (message: IMessage): void => {
  EventManager.publish(CHANNEL_NAME, {
    id: uuidv4(),
    // icon: 'название иконки уведомления',
    // title: t('Уведомление'),
    type: 'info',
    delay: 1000,
    ...message,
  });
};

export { showFlashMessage, CHANNEL_NAME };
