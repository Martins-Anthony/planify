export const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour <= 21; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;
      options.push(timeString);
    }
  }
  return options;
};

export const generateTimeOptionsNumber = () => {
  const options = [];
  for (let hour = 0; hour <= 12; hour++) {
    for (let minutes = 0; minutes < 100; minutes += 25) {
      const timeString = `${hour}.${minutes}`;
      options.push(Number(timeString));
    }
  }
  return options;
};

export const generateTimeOptionsObject = () => {
  const timeString = generateTimeOptions();
  const timeNumber = generateTimeOptionsNumber();
  const options = [];
  for (let i = 0; i < timeString.length; i++) {
    options.push({ timeString: timeString[i], timeNumber: timeNumber[i] });
  }
  return options;
};
