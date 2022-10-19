import Formats from '@lomray/microservices-client-api/constants/formats';
import type { IAttachment } from '@lomray/microservices-client-api/interfaces/attachments/entities/attachment';
import { mdiPlusOutline, mdiDeleteOutline } from '@mdi/js';
import Icon from '@mdi/react';
import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from '@components/button-primary';
import addNotification from '@helpers/add-notification';
import Confirmation from '@modals/confirmation';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

const titleNotification = 'translation:titleNotification';

type Props = StoreProps;

const EditAvatar: FC<Props> = ({
  editAvatar: {
    userPageStore: { user },
    removeAvatar,
    updateAvatar,
    isFetching,
  },
}) => {
  const { t } = useTranslation(['translation', 'user-page']);
  const [isVisible, setIsVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState<IAttachment | null | undefined>(user?.avatar);

  /**
   * Remove avatar
   */
  const onRemove = async (): Promise<void | undefined> => {
    setIsVisible(false);

    const isSuccess = await removeAvatar();

    if (!isSuccess) {
      addNotification('danger', t(titleNotification), 'Error');

      return;
    }

    addNotification('success', t(titleNotification), t('translation:messageNotification'));
    setUserAvatar(null);
  };

  /**
   * Save avatar
   */
  const onSave = async (): Promise<void | undefined> => {
    const isSuccess = await updateAvatar(userAvatar);

    if (!isSuccess) {
      addNotification('danger', t(titleNotification), 'Error');

      return;
    }

    addNotification('success', t(titleNotification), t('translation:messageNotification'));
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    Array.from(e.target.files).forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onloadend = (event) => {
        if (!event?.target?.result) {
          return;
        }

        setUserAvatar({
          id: '',
          alt: '',
          type: file.type,
          formats: {
            [Formats.large]: {
              url: fileReader.result,
            },
          },
        } as IAttachment);
      };
    });
  };

  return (
    <>
      <Confirmation
        isOpen={isVisible}
        textQuestion={t('user-page:removeProfile')}
        onCancel={setIsVisible}
        onAccept={onRemove}
      />
      <div className={styles.wrapper}>
        {userAvatar ? (
          <div className={styles.container}>
            {[userAvatar].map(({ id, formats, alt }) => (
              <div key={formats?.large.url} data-id={id}>
                <img src={formats?.large.url} alt={alt} />
                <div className={styles.buttonBar}>
                  <ButtonPrimary kind="transparent" onClick={() => setIsVisible(true)}>
                    <Icon path={mdiDeleteOutline} size={3} />
                  </ButtonPrimary>
                  <div className={styles.wrapperButton}>
                    <input type="file" multiple onChange={uploadImage} />
                    <Icon path={mdiPlusOutline} size={5} color="#FFF" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.noAvatar}>{t('user-page:noAvatar')}</div>
            <div className={styles.wrapperButton}>
              <input type="file" multiple onChange={uploadImage} />
              <Icon path={mdiPlusOutline} size={5} color="#FFF" />
            </div>
          </>
        )}
        <ButtonPrimary disabled={Boolean(userAvatar?.id) || isFetching} onClick={onSave}>
          {t('translation:saveChanges')}
        </ButtonPrimary>
      </div>
    </>
  );
};

export default EditAvatar;
