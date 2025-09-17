from fastapi import FastAPI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

ALPHA_VANTAGE_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Insight Trader API", "alpha_vantage_key_loaded": bool(ALPHA_VANTAGE_KEY), "news_api_key_loaded": bool(NEWS_API_KEY) }
