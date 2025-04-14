
interface FethObject  {
    
    symbol: string,        
    priceChange: string,
    priceChangePercent:string,
    weightedAvgPrice: string,
    prevClosePrice: string,
    lastPrice: string,
    lastQty: string,
    bidPrice: string,
    bidQty: string,
    askPrice: string,
    askQty: string,
    openPrice: string,
    highPrice: string,
    lowPrice: string,
    volume: string,
    quoteVolume: string,
    openTime: string,
    closeTime: string,
    firstId: string,
    lastId: string,
    count: string
      
}

export const fetchTop100Symbols = async () => {
    const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
    const data = await response.json();
    console.log(data);
    const symbols = data.symbols.map((symbol: FethObject) => symbol.symbol.toLowerCase());
    return symbols.slice(0, 100); 
  };
  
  