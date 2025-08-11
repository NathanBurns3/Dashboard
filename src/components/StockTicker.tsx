import { useRef } from "react";
import type { Stock } from "../models/StockModel";

function StockTicker({ stocks }: { stocks: Stock[] }) {
  const tickerRef = useRef<HTMLUListElement>(null);

  const stockPairs: [Stock?, Stock?][] = [];
  for (let i = 0; i < stocks.length; i += 2) {
    stockPairs.push([stocks[i], stocks[i + 1]]);
  }

  return (
    <div className="flex overflow-hidden bg-black h-full">
      <ul
        ref={tickerRef}
        className="flex gap-60 items-center h-full text-white animate-infinite-scroll"
      >
        {[...stockPairs, ...stockPairs].map(([stock1, stock2], idx) => (
          <li
            key={idx}
            className="flex flex-col gap-30 min-w-[120px] subway-ticker-font"
          >
            {[stock1, stock2].map(
              (stock, i) =>
                stock && (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-40">
                      <p className="text-grey-300 text-9xl">{stock.symbol}</p>
                      <p className="text-grey-300 text-9xl">${stock.price}</p>
                    </div>
                    <div className="flex items-center justify-center gap-40">
                      <p
                        className={`${
                          stock.priceChange > 0
                            ? "text-green-500"
                            : "text-red-500"
                        } text-9xl`}
                      >
                        {stock.priceChange > 0 ? "+" : "-"}$
                        {Math.abs(stock.priceChange)}
                      </p>
                      <p
                        className={`${
                          stock.priceChange > 0
                            ? "text-green-500"
                            : "text-red-500"
                        } text-9xl`}
                      >
                        {stock.priceChange > 0 ? "+" : "-"}
                        {Math.abs(stock.percentChange)}%
                      </p>
                    </div>
                  </div>
                )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockTicker;
