export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple dashes with a single dash
    .replace(/^-+/, '') // Remove dashes at the beginning
    .replace(/-+$/, ''); // Remove dashes at the end
};
