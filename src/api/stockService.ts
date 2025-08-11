import type { Stock } from "../models/StockModel";

const STOCKS: string[] = [
  "NVDA",
  "META",
  "AAPL",
  "GOOGL",
  "AMZN",
  "MSFT",
  "JNJ",
  "ABBV",
  "BSX",
  "JPM",
  "GS",
  "RTX",
  "LHX",
  "DGRO",
  "VOO",
  "SCHB",
  "QQQ",
];

const API_KEY = import.meta.env.VITE_STOCK_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1/quote";

export async function fetchStocks(): Promise<Stock[]> {
  const stocks: Stock[] = [];

  await Promise.all(
    STOCKS.map(async (symbol) => {
      const url = `${BASE_URL}?symbol=${symbol}&token=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) return;

      const data = await response.json();

      if (typeof data.c === "number") {
        stocks.push({
          symbol,
          price: data.c,
          priceChange: data.d,
          percentChange: Number(data.dp.toFixed(2)),
        });
      }
    })
  );
  return stocks;
}
