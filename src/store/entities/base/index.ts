import type {
  IAttachment,
  IAttachmentFormat,
} from '@lomray/microservices-client-api/interfaces/attachments/entities/attachment';

export type TEntitiesAttachments = Record<string, IAttachment[]>;
type TBaseEntity = { id: string; attachments?: IAttachment[] };

/**
 * Base entity methods
 */
class Base {
  /**
   * Get any attachment
   */
  static getAnyAttachmentFormat(attachment?: IAttachment): IAttachmentFormat | undefined {
    if (!attachment) {
      return;
    }

    const formats = Object.values(attachment?.formats ?? {});

    return formats?.[formats.length - 1];
  }

  /**
   * Assign entities attachments
   */
  static assignEntitiesAttachments = <TEntity extends TBaseEntity>(
    entities: TEntity[],
    attachments: IAttachment[],
    customAssign: ((entity: TEntity, attachments: IAttachment[]) => void) | string = 'attachments',
  ): TEntitiesAttachments => {
    const entityAttachments = attachments?.reduce((res, { attachmentEntities, ...attachment }) => {
      // index attachments by entity id
      attachmentEntities?.forEach((attachmentEntity) => {
        if (!res[attachmentEntity.entityId]) {
          res[attachmentEntity.entityId] = [];
        }

        res[attachmentEntity.entityId].push(attachment);
      });

      return res;
    }, {});

    // Assign attachments to entity
    entities?.forEach((entity) => {
      if (typeof customAssign === 'function') {
        customAssign(entity, entityAttachments[entity.id] as IAttachment[]);
      } else {
        entity[customAssign] = entityAttachments[entity.id];
      }
    });

    return entityAttachments;
  };
}

export default Base;
