from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
import numpy as np

app = FastAPI()

class Record(BaseModel):
    date: str
    totalCharged: float

@app.post("/forecast")
async def forecast(records: List[Record]):
    if len(records) < 2:
        return []

    df = pd.DataFrame([r.dict() for r in records])
    df['date'] = pd.to_datetime(df['date'])
    df['ordinal'] = df['date'].map(datetime.toordinal)

    X = df[['ordinal']]
    y = df['totalCharged']
    model = LinearRegression().fit(X, y)

    last_date = df['date'].max()
    future_days = 10
    future_dates = [last_date + timedelta(days=i) for i in range(1, future_days + 1)]
    future_ordinals = np.array([d.toordinal() for d in future_dates]).reshape(-1, 1)
    raw_predictions = model.predict(future_ordinals)
    predictions = np.clip(raw_predictions, 0, None)

    results = [
        {"date": d.strftime('%Y-%m-%d'), "predicted_kwh": round(p, 2)}
        for d, p in zip(future_dates, predictions)
    ]

    return results

@app.post("/forecast/usage")
async def forecast_usage(records: List[Record]):
    if len(records) < 2:
        return {"error": "Need at least 2 records"}

    df = pd.DataFrame([r.dict() for r in records])
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')

    total_days = (df['date'].max() - df['date'].min()).days or 1
    total_kwh = df['totalCharged'].sum()
    avg_kwh_per_day = total_kwh / total_days

    days_to_forecast = 30
    predicted_total = round(avg_kwh_per_day * days_to_forecast, 2)

    return {
        "days": days_to_forecast,
        "predicted_total_kwh": predicted_total,
        "avg_kwh_per_day": round(avg_kwh_per_day, 2),
        "based_on_days": total_days
    }
