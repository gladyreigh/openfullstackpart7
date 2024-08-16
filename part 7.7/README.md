# Enhancing the Country Information App

This document outlines the updates made to the country information application by implementing the `useCountry` custom hook and integrating it with the `App` component.

## Summary

1. **Created the `useCountry` Hook**:
   - Fetches country details from the REST Countries API.
   - Manages loading and error states.

2. **Updated `Country` Component**:
   - Displays country details or appropriate messages based on the current state.

3. **Refactored `App` Component**:
   - Uses the `useField` hook for input management.
   - Integrates the `useCountry` hook to fetch and display country information.

## Detailed Steps

### 1. Creating the `useCountry` Hook

We created a custom hook `useCountry` to handle fetching country data and managing its state.

**Code: `src/hooks/useCountry.js`**
```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name === '') {
      setCountry(null);
      return;
    }

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        setCountry({
          found: true,
          data: response.data[0]
        });
      } catch (error) {
        setCountry({
          found: false,
          data: null
        });
        setError('Country not found');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  return { country, loading, error };
};

export default useCountry;
