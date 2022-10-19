export const is_form_invalid = (err: object) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
