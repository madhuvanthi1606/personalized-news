import React from 'react';
const NewsCard = ({ article }) => {
    return (
        <div className="news-card">
            <img src={article.urlToImage || 'https://via.placeholder.com/400x200'} alt={article.title} />
            <div className="news-card-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
        </div>
    );
};
export default NewsCard;