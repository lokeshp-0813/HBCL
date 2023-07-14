function flattenObject(obj) {
  const result = [];
  
  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'object' && value !== null) {
      result.push(...flattenObject(value));
    } else {
      result.push(value);
    }
  }
  
  return result;
}

module.exports = {flattenObject}