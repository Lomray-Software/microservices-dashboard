import type { THandleStateForm } from '@lomray/microservices-client-api/helpers/handle-state-form';
import handleStateFormDefault from '@lomray/microservices-client-api/helpers/handle-state-form';
import addNotification from '@helpers/add-notification';
import i18n from '@services/localization';

/**
 * Set errors for fields and main error also adding notification for success
 */
const handleStateForm: THandleStateForm = (result, values, helpers): void => {
  if (typeof result === 'boolean') {
    addNotification(
      'success',
      i18n.t('translation:titleNotification'),
      i18n.t('translation:messageNotification'),
    );
  }

  return handleStateFormDefault(result, values, helpers);
};

export default handleStateForm;
