import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { IMessage } from '@components/flash-messages/show-flash-message';
import { CHANNEL_NAME } from '@components/flash-messages/show-flash-message';
import EventManager from '@services/event-manager';

type IMessages = { [key: string]: Required<IMessage> };

/**
 * Display flash messages
 * @constructor
 */
const FlashMessages: FC = () => {
  const [messages, setMessages] = useState<IMessages>({});

  useEffect(() => {
    const unsubscribe = EventManager.subscribe<Required<IMessage>>(CHANNEL_NAME, (message) => {
      setMessages((prevState) => ({ ...prevState, message }));

      if (message.delay === null) {
        return;
      }

      // Remove message after 'delay' time
      setTimeout(() => {
        setMessages((prevState) => {
          delete prevState[message.id];

          return prevState;
        });
      }, message.delay);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {Object.entries(messages).map(([id, { message }]) => (
        <div key={id}>{message}</div>
      ))}
    </div>
  );
};

export default FlashMessages;
