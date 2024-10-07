import React, { useState, useEffect } from 'react';
import './News.css';

const Welcome = ({ selectedTopic }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const apiKey = 'pub_33388cfa6bc9eb37e46f445a0e0789348ece8';
        const response = await fetch(`https://newsdata.io/api/1/news?country=in&apikey=${apiKey}&q=${selectedTopic}&language=en&image=1`);
        const result = await response.json();

        console.log(result);

        if (result.results && Array.isArray(result.results)) {
          setArticles(result.results);
        } else {
          console.error('Invalid or missing "results" property in the API response:', result);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();

    const intervalId = setInterval(fetchArticles, 60000);

    return () => clearInterval(intervalId);
  }, [selectedTopic]);

  return (
    <div className={`welcome-container ${articles.length === 0 ? 'no-articles' : ''}`}>
      {articles.length === 0 && (
        <div className="background-image">
          {/* Display the background image when there are no articles */}
          No
        </div>
      )}

      <div className="news-container">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="card">
              <h3>{article.title}</h3>
              <img src={article.image_url} alt={article.title} className="card-image" />
              {article.description && (
                <p>{article.description.length > 100 ? `${article.description.slice(0, 100)}... ` : article.description}</p>
              )}
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        ) : (
          <div className="no-articles-message">
            {/* Display a message or any content when there are no articles */}
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
