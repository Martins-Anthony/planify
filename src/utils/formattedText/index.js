export const formattedText = (text, type) => {
  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'firstLetterUppercase':
      return text.charAt(0).toUpperCase() + text.slice(1);
    case 'firstLetterLowercase':
      return text.charAt(0).toLowerCase() + text.slice(1);
    default:
      return text;
  }
};
