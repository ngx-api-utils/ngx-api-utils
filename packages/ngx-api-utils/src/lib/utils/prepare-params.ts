/**
 * Filters object properties stripping any `undefined` value and naively casting any value to string
 * This is quite useful for preparing params for GET requests
 */
export function prepareParams(params: Record<string, any>): Record<string, string> {
  return Object.keys(params).reduce(
    (preparedParams, k) => {
      const v = params[k];
      if (v !== undefined) {
        preparedParams[k] = String(v);
      }
      return preparedParams;
    },
    {} as Record<string, string>
  );
}
