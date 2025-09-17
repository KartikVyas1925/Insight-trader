import { useState } from 'react';

function Search({ onSearch }) { // We now accept an 'onSearch' function
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol) {
      onSearch(symbol); // Call the function passed from Dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 my-4">
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
        className="p-2 w-64 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button
        type="submit"
        className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-md font-bold transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default Search;