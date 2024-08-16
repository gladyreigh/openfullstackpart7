# Updating the Anecdote App with Hooks and Routing

This document outlines the steps taken to enhance the anecdote application with hooks and routing as part of exercises 7.4 to 7.6.

## Summary

1. **Simplified Form Handling with `useField` Hook**
2. **Added a Reset Button to the Form**
3. **Resolved Console Warnings Related to Unsupported Attributes**

## Steps to Achieve the Updates

### 1. Create and Use the `useField` Hook

To simplify form management, we created a custom hook `useField` that handles field values and changes. This hook is defined in `src/hooks/index.js`.

**Code: `src/hooks/index.js`**
```js
import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};
