/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 19:48:55
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-16 11:38:16
 */
import { useState, useEffect } from 'react';
import deepEqual from './deepEqual';

function useDeepEqual (input) {

  const [value, setValue] = useState(input);

  useEffect(() => {

    if (!deepEqual(input, value)) {
      setValue(input)
    }
    
  }, [input, value]);

  return value;
}

export default useDeepEqual;
