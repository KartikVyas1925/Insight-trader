import { useState } from 'react';
import Search from './Search';
import axios from 'axios';
import NewsList from './NewsList'; // Import the new component

function Dashboard() {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (symbol) => {
    setLoading(true);
    setError(null);
    setNewsData(null);

    try {
      const newsRes = await axios.get(`http://127.0.0.1:8000/news?symbol=${symbol}`);
      setNewsData(newsRes.data);
    } catch (err) {
      setError("Could not fetch data. Please check the stock symbol and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-cyan-400 p-4">
        Insight Trader
      </h1>

      <Search onSearch={fetchData} />

      <div className="mt-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {newsData && newsData.articles && <NewsList articles={newsData.articles} />}
      </div>
    </main>
  );
}

export default Dashboard;