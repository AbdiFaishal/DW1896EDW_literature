export const convertString = (string, limit = 25) => {
  const newString = [];
  if (string.length > limit) {
    string.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newString.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newString.join(' ')}`;
  } else {
    return string;
  }
};

export const convertTitle = (title, limit = 25) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')}...`;
  } else {
    return title;
  }
};
