import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');

      // Call the API
      const result = await axios.post('https://your-flask-backend-url.com/bfhl', parsedJson);
      setResponse(result.data);

      // Show the dropdown
      setShowDropdown(true);
    } catch (err) {
      setError('Invalid JSON input');
      setShowDropdown(false);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{response.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Your Roll Number Here</h1>

      <textarea
        value={jsonInput}
        onChange={handleJsonInput}
        placeholder="Enter JSON here"
        rows="10"
        cols="50"
      />

      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showDropdown && (
        <div>
          <h2>Select Options</h2>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            Highest lowercase alphabet
          </label>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
