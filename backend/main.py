from fastapi import FastAPI, HTTPException
import os
from dotenv import load_dotenv
import requests
from transformers import pipeline # New import for the model

# Tell dotenv the exact path of the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

app = FastAPI()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

# Load the sentiment analysis model when the server starts
sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Insight Trader API"}

@app.get("/stock-data")
def get_stock_data(symbol: str):
    # (Code for this endpoint is unchanged)
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={ALPHA_VANTAGE_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if "Error Message" in data:
            raise HTTPException(status_code=404, detail=f"Stock symbol '{symbol}' not found.")
        return data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting Alpha Vantage API: {e}")

@app.get("/news")
def get_news(symbol: str):
    url = f"https://newsapi.org/v2/everything?q={symbol}&sortBy=publishedAt&language=en&apiKey={NEWS_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # --- NEW: Perform sentiment analysis ---
        if "articles" in data:
            for article in data["articles"]:
                # Analyze the title and description (if it exists)
                text_to_analyze = article.get("title", "") + ". " + article.get("description", "")
                if text_to_analyze:
                    sentiment_result = sentiment_pipeline(text_to_analyze)
                    article["sentiment"] = sentiment_result[0] # Add sentiment to the article
        
        return data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting News API: {e}")