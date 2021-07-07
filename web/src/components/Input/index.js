/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ErrorMessage, useField } from 'formik';

export function Input({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className=" my-4">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={` my-1 rounded-lg border-transparent flex-1 appearance-none border
        border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
        shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
        ${meta.touched && meta.error && 'border-red-500'}`}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-600 text-xs"
      />
    </div>
  );
}
