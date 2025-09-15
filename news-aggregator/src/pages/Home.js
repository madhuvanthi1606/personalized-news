import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const categories = ['technology', 'business', 'sports', 'health', 'science', 'entertainment'];
const Home = ({user, searchQuery}) => {
    const [articles, setArticles]=useState([]);
    const [loading, setLoading]=useState(true);
    const [preferences, setPreferences] = useState([]);
    const [activeCategory, setActiveCategory] = useState('general');
    useEffect(() => {
        const fetchPreferences = async () => {
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            setPreferences(docSnap.data().preferences || []);
            setActiveCategory(docSnap.data().preferences[0] || 'general');
            }
        } else {
            setPreferences([]);
            setActiveCategory('general');
        }
        };
        fetchPreferences();
    }, [user]);
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const apiKey = process.env.REACT_APP_NEWS_API_KEY;
                let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
                if (searchQuery) {
                    url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
                } else if (activeCategory !== 'general') {
                    url += `&category=${activeCategory}`;
                }
                const response = await axios.get(url);
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
            setLoading(false);
        };
        fetchPreferences();
    }, [user]);
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const apiKey = process.env.REACT_APP_NEWS_API_KEY;
                let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
                if (searchQuery) {
                    url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
                } else if (activeCategory !== 'general') {
                    url += `&category=${activeCategory}`;
                }
                const response = await axios.get(url);
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
            setLoading(false);
        };
        fetchNews();
    }, [activeCategory, searchQuery]);
    const handlePreferenceChange = async (category) => {
        if (!user) {
            alert("Please log in to save your preferences.");
            return;
        }
        const newPreferences = preferences.includes(category)
            ? preferences.filter(pref => pref !== category)
            : [...preferences, category];
        setPreferences(newPreferences);
        try {
            await setDoc(doc(db, 'users', user.uid), { preferences: newPreferences }, { merge: true });
        } catch (error) {
            console.error("Error saving preferences:", error);
        }
    };
    return (
        <div className="home-container">
            {user && (
                <div className="preferences-panel">
                    <h4>Your Preferences</h4>
                    {categories.map(category => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                checked={preferences.includes(category)}
                                onChange={() => handlePreferenceChange(category)}
                            />
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                    ))}
                </div>
            )}
            <div className="category-tabs">
                { (user && preferences.length > 0 ? preferences : ['general', ...categories]).map(category => (
                    <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'active' : ''}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <div className="news-grid">
                {loading ? <p>Loading news...</p> : articles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </div>
    );
};
export default Home;