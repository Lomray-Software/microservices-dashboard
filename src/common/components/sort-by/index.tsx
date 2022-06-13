import { mdiSortAscending, mdiSortDescending, mdiSort } from '@mdi/js';
import Icon from '@mdi/react';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { IJsonQueryOrder } from '@store/endpoints/interfaces/common/query';
import styles from './styles.module.scss';

export interface ISortByItem {
  id: string;
  onChange: (name: string, value: IJsonQueryOrder | undefined) => void;
  initValue?: IJsonQueryOrder;
}

const COLOR_ICON = '#6c7293';

const SortBy: FC<ISortByItem> = ({ id, initValue, onChange }) => {
  const [value, setValue] = useState(initValue);

  const onPress = useCallback(() => {
    let nextOrder: IJsonQueryOrder | undefined;

    switch (value) {
      case IJsonQueryOrder.ASC:
        nextOrder = IJsonQueryOrder.DESC;

        break;

      case IJsonQueryOrder.DESC:
        nextOrder = undefined;

        break;

      case undefined:
        nextOrder = IJsonQueryOrder.ASC;

        break;
    }

    setValue(nextOrder);

    onChange(id, nextOrder);
  }, [id, onChange, value]);

  const item = {
    [IJsonQueryOrder.ASC]: <Icon path={mdiSortDescending} size={1} color={COLOR_ICON} />,
    [IJsonQueryOrder.DESC]: <Icon path={mdiSortAscending} size={1} color={COLOR_ICON} />,
  };

  return (
    <button type="button" className={styles.button} onClick={onPress}>
      {item[value ?? ''] || <Icon path={mdiSort} size={1} color={COLOR_ICON} />}
    </button>
  );
};

export default SortBy;
