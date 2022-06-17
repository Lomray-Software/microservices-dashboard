interface IRemove<TEntity> {
  deleted: Partial<TEntity>[];
  entities?: TEntity[];
}

export default IRemove;
