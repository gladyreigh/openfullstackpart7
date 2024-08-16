// src/hooks/useCountry.js
import { useState, useEffect } from 'react';

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return; // If no country name is provided, do nothing

    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
          throw new Error('Country not found');
        }
        const data = await response.json();
        setCountry(data[0]); // Assuming we get an array and take the first item
      } catch (err) {
        setError(err.message);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]); // Dependency array ensures the effect runs when countryName changes

  return { country, loading, error };
};

export default useCountry;
