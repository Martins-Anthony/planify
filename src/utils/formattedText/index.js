export const formattedText = (text, type) => {
  const array = text.split(' ');
  const newArray = [];

  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'firstLetterUppercase':
      return text.charAt(0).toUpperCase() + text.slice(1);
    case 'firstLetterLowercase':
      return text.charAt(0).toLowerCase() + text.slice(1);
    case 'camelCase':
      for (let i = 0; i < array.length; i++) {
        if (i < 1) {
          newArray.push(array[i]);
        } else {
          newArray.push(formattedText(array[i], 'firstLetterUppercase'));
        }
      }
      return newArray.join('');
    default:
      return text;
  }
};
