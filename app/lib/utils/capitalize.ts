/**
 * Capitalizes the first letter of each word in a string
 * @param str The string to capitalize
 * @returns A string with capitalized words
 */
export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns A string with the first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
