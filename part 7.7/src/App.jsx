import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for managing form fields
const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

// Custom hook for fetching country data
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
  }, [name]); // Fetch country data when the `name` changes

  return { country, loading, error };
};

// Component to display country details or error messages
const Country = ({ country, loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!country || !country.found) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>Capital: {country.data.capital ? country.data.capital[0] : 'N/A'}</div>
      <div>Population: {country.data.population}</div>
      <img src={country.data.flags.svg} height='100' alt={`Flag of ${country.data.name.common}`} />
    </div>
  );
};

// Main App component
const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const { country, loading, error } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} loading={loading} error={error} />
    </div>
  );
};

export default App;
