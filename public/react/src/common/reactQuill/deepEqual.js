function deepEqual (prev, current) {
  if (prev === current) { // 基本类型比较，值，类型都相同 或者同为 null or undefined
    return true;
  }

  if ((!prev && current) 
    || (prev && !current)
    || (!prev && !current)
  ) {
    return false;
  }

  if (Array.isArray(prev)) {
    if (!Array.isArray(current)) return false;
    if (prev.length !== current.length) return false;
    
    for (let i = 0; i < prev.length; i++) {
      if (!deepEqual(current[i], prev[i])) {
        return false;
      }
    }
    return true;
  }

  if (typeof current === 'object') {
    if (typeof prev !== 'object') return false;
    const prevKeys = Object.keys(prev);
    const curKeys = Object.keys(current);

    if (prevKeys.length !== curKeys.length) return false;

    prevKeys.sort();
    curKeys.sort();

    for (let i = 0; i < prevKeys.length; i++) {
      if (prevKeys[i] !== curKeys[i]) return false;
      const key = prevKeys[i];
      if (!deepEqual(prev[key], current[key])) return false;
    }

    return true;
  }

  return false;
}

export default deepEqual;
