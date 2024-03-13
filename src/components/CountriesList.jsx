import React, { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const CountrySelector = ({ value, onChange }) => {
    const options = useMemo(() => countryList().getData(), []);
  
    const changeHandler = selectedOption => {
      onChange(selectedOption.value);
    };
  
    return (
      <Select 
        options={options} 
        value={options.find(option => option.value === value)} 
        onChange={changeHandler} 
        className='bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 '
      />
    );
  };
  
export default CountrySelector;
