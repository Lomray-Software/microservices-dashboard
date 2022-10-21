import i18n from '@lomray/afterjs-helpers/services/localization';
import { APP_LANGUAGES, DEFAULT_APP_LANGUAGE, IS_CLIENT } from '@constants/index';

if (IS_CLIENT) {
  void i18n.init({
    lng: DEFAULT_APP_LANGUAGE,
    supportedLngs: APP_LANGUAGES,
  });
}

export default i18n;
