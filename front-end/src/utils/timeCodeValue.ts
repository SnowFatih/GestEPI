export const checkboxDefaultValue = (timeCode: string) => {
  switch (timeCode) {
    case 'start':
    case 'end':
      return true;
    default:
      return false;
  }
};

export const inputDefaultValue = (timeCode: string | null) => {
  switch (timeCode) {
    case 'start':
    case 'end':
    case null:
      return '';
    default:
      return timeCode;
  }
};

export const prepareTimeCodeValue = (checkboxValue: boolean, dataValue: string, checkboxReturnValue: 'start' | 'end') => {
  if (checkboxValue) {
    return checkboxReturnValue;
  } else {
    return dataValue;
  }
};
