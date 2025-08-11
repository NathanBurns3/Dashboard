import { useEffect, useState } from "react";
import StockTicker from "./components/StockTicker";
import type { Stock } from "./models/StockModel";
import { fetchStocks } from "./api/stockService";

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetStocks = () => {
      setLoading(true);
      fetchStocks()
        .then(setStocks)
        .catch(console.error)
        .finally(() => setLoading(false));
    };

    fetchAndSetStocks();
    const intervalID = setInterval(fetchAndSetStocks, 300000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {loading ? (
        <p className="flex-1 flex items-center justify-center">Loading...</p>
      ) : (
        <div className="flex-1">
          <StockTicker stocks={stocks} />
        </div>
      )}
    </div>
  );
}

export default App;
