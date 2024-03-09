const generateID = (len = 2) => {
  //Can change 7 (0-6 characters) to 2 for longer results.
  return (Math.random() + 1).toString(36).substring(len);
};

export default generateID;
