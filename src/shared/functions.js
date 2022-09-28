const arrayEquals = (a = [], b = []) => {
  a.sort();
  b.sort();
  return (
    Array.isArray(a)
    && Array.isArray(b)
    && a.length === b.length
    && a.every((val, index) => val === b[index])
  );
};

export default arrayEquals;
