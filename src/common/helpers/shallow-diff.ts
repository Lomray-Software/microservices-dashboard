/**
 * Return shallow difference between two objects
 */
const shallowDiff = (obj: Record<string, any>, obj2: Record<string, any>): Record<string, any> =>
  Object.entries(obj).reduce(
    (res, [field, value]) => ({
      ...res,
      ...(obj2[field] !== value ? { [field]: value } : {}),
    }),
    {},
  );

export default shallowDiff;
