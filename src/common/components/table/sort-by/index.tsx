import type { IJsonQuery } from '@lomray/microservices-types';
import { JQOrder } from '@lomray/microservices-types';
import { mdiSortAscending, mdiSortDescending, mdiSort } from '@mdi/js';
import Icon from '@mdi/react';
import isEmpty from 'lodash.isempty';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import styles from './styles.module.scss';

export interface ISortBy {
  id: string;
  setOrderBy: (sortBy: IJsonQuery<Record<string, any>>['orderBy']) => void;
  initValue?: JQOrder;
}

const COLOR_ICON = '#6c7293';

const setOrder = (
  id: string,
  value: JQOrder | undefined,
  handleChange: (sortBy: IJsonQuery<Record<string, any>>['orderBy']) => void,
): void => {
  const orderBy = {};

  if (isEmpty(orderBy)) {
    orderBy[id] = value;

    return handleChange(orderBy);
  }

  if (orderBy.hasOwnProperty(id)) {
    orderBy[id] = value;
  } else {
    for (const prop of Object.keys(orderBy)) {
      delete orderBy[prop];
    }

    orderBy[id] = value;
  }

  return handleChange(orderBy);
};

const item = {
  [JQOrder.ASC]: <Icon path={mdiSortDescending} size={1} color={COLOR_ICON} />,
  [JQOrder.DESC]: <Icon path={mdiSortAscending} size={1} color={COLOR_ICON} />,
};

const SortBy: FC<ISortBy> = ({ id, initValue, setOrderBy }) => {
  const [value, setValue] = useState(initValue);

  const onPress = useCallback(() => {
    let nextOrder: JQOrder | undefined;

    switch (value) {
      case JQOrder.ASC:
        nextOrder = JQOrder.DESC;

        break;

      case JQOrder.DESC:
        nextOrder = undefined;

        break;

      case undefined:
        nextOrder = JQOrder.ASC;

        break;
    }

    setValue(nextOrder);
    setOrder(id, nextOrder, setOrderBy);
  }, [id, setOrderBy, value]);

  return (
    <button type="button" className={styles.button} onClick={onPress}>
      {item[value ?? ''] || <Icon path={mdiSort} size={1} color={COLOR_ICON} />}
    </button>
  );
};

export default SortBy;
