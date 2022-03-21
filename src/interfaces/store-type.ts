/* eslint-disable @typescript-eslint/no-empty-interface */

/**
 * Base interface for domain store
 */
interface IDomain {}

/**
 * Base interface for UI store
 */
interface IUi {}

type TStore = IDomain | IUi;

export { IDomain, IUi, TStore };
