import useOnClickOutside from '@lomray/client-helpers-react/hooks/use-outside-click';
import type { FC } from 'react';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from '@components/button-primary';
import styles from './styles.module.scss';

interface IConfirmation {
  isOpen: boolean;
  onCancel: (isVisible: boolean) => void;
  onAccept: () => Promise<void>;
  textQuestion: string;
}

const Confirmation: FC<IConfirmation> = ({ isOpen, onAccept, onCancel, textQuestion }) => {
  const { t } = useTranslation('translation');

  const ref = useRef<HTMLDivElement>(null);

  /**
   * Close popup when click outside element
   */
  useOnClickOutside(ref, () => onCancel(false));

  /**
   * Close popup
   */
  const onClose = () => onCancel(false);

  return isOpen ? (
    <div className={styles.wrapperPopup}>
      <div className={styles.background} />
      <div ref={ref} className={styles.popup}>
        <p className={styles.agreement}>{textQuestion}</p>
        <ButtonPrimary onClick={onAccept}>{t('yes')}</ButtonPrimary>
        <ButtonPrimary onClick={onClose}>{t('no')}</ButtonPrimary>
      </div>
    </div>
  ) : null;
};

export default Confirmation;
