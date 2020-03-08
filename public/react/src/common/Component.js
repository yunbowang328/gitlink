import md5 from 'md5';
export function setmiyah(logins){
  const opens ="79e33abd4b6588941ab7622aed1e67e8";
  return md5(opens+logins);
}
