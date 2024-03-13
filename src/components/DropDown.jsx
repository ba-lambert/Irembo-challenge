import React from 'react';

function Dropdown({ options, value, onChange, placeholder }) {
  const handleChange = event => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select value={value} onChange={handleChange} className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 '>
      <option value="" disabled hidden>{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value} >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
