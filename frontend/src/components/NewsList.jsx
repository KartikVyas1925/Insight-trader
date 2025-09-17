function NewsList({ articles }) {
  const getSentimentColor = (label) => {
    if (label === 'positive') return 'text-green-400';
    if (label === 'negative') return 'text-red-400';
    return 'text-gray-400'; // neutral
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {articles.map((article, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
          <h3 className="font-bold text-lg mb-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              {article.title}
            </a>
          </h3>
          <p className="text-sm text-gray-300 mb-3">{article.description}</p>
          <div className="text-right">
            <span className={`font-bold ${getSentimentColor(article.sentiment.label)}`}>
              {article.sentiment.label.toUpperCase()} ({article.sentiment.score.toFixed(2)})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;