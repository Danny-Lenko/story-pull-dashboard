export const pluralize = (word: string) => {
  if (!word) return '';

  if (word.endsWith('y')) {
    return word.slice(0, -1) + 'ies';
  } else if (
    word.endsWith('s') ||
    word.endsWith('x') ||
    word.endsWith('z') ||
    word.endsWith('ch') ||
    word.endsWith('sh')
  ) {
    return word + 'es';
  } else {
    return word + 's';
  }
};
