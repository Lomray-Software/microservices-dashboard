import ApiClient from '@lomray/microservices-client-api/api-client';
import { API_DOMAIN, DEFAULT_APP_LANGUAGE, IS_CLIENT, IS_PROD, WINDOW_OBJ } from '@constants/index';
import i18n from '@services/localization';
import Endpoints from '@store//endpoints';
import UserStore from '@store/modules/user';
import Auth from '@store/modules/user/auth';

// exclude from client.js
const Notification = import('@components/notifications');

interface IInitApiParams {
  headers?: Record<string, any>;
}

const initApi = ({ headers }: IInitApiParams = {}) => {
  const apiClient = new ApiClient({
    isClient: IS_CLIENT,
    apiDomain: API_DOMAIN,
    isProd: IS_PROD,
    lang: DEFAULT_APP_LANGUAGE,
    userStore: UserStore,
    authStore: Auth,
    headers,
    onSignOut: (code) => {
      if (code !== 405) {
        return;
      }

      // sometimes auth gateway not re-render and user still in the same page
      if (IS_CLIENT) {
        WINDOW_OBJ.location.reload();
      }
    },
    onShowError: async ({ message }) => {
      (await Notification).Store.addNotification({
        title: i18n.t('translation:errorTitle'),
        message,
        type: 'danger',
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
    },
    params: {
      errorConnectionMsg: i18n.t('translation:timeoutError'),
      errorInternetMsg: i18n.t('translation:noInternetError'),
    },
  });
  const endpoints = new Endpoints(apiClient);

  i18n.on('languageChanged', (lng) => {
    apiClient.setLanguage(lng);
  });

  return { apiClient, endpoints };
};

export default initApi;
