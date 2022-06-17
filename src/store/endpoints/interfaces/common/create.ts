import type { IQuery } from './query';

interface ICreate<TEntity> {
  fields: Partial<TEntity>;
  query?: IQuery<TEntity>['query'];
}

export default ICreate;
