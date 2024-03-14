const TWO_WORDS_SNAKE_CASE = /^[a-z0-9]+(_[a-z0-9][a-z0-9]*){1}$/;
const THREE_WORDS_SNAKE_CASE = /^[a-z0-9]+(_[a-z0-9][a-z0-9]*){2}$/;
const SLUG = /^([a-z0-9]+)((-|_)[a-z0-9]+)*$/;
const FULL_URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const TIME_CODE_FORMAT = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

export const isTwoWordsSnakeCase = (text: string | undefined | null): boolean => {
  if (!text) {
    return false;
  }

  return TWO_WORDS_SNAKE_CASE.test(text);
};

export const isThreeWordsSnakeCase = (text: string | undefined | null): boolean => {
  if (!text) {
    return false;
  }

  return THREE_WORDS_SNAKE_CASE.test(text);
};

export const isFullUrl = (text: string | undefined | null): boolean => {
  if (!text) {
    return false;
  }

  return FULL_URL_REGEX.test(text);
};

export const isSlug = (text: string | undefined | null): boolean => {
  if (!text) {
    return false;
  }

  return SLUG.test(text);
};

export const isFullUrlOrNull = (text: string | undefined | null): boolean => !text || isFullUrl(text);

export const isHoursFormat = (hour: string | undefined | null): boolean => {
  if (!hour) {
    return false;
  }

  return TIME_CODE_FORMAT.test(hour);
};
