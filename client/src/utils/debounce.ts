import React from 'react';
import { SubmitFunction } from 'react-router-dom';

export const debounce = (onChange: SubmitFunction) => {
  let timeout: string | number | NodeJS.Timeout | undefined;
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = e.currentTarget!.form;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(form);
    }, 1000);
  };
};
