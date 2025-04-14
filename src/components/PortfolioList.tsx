import { useEffect, useState } from "react"
import { PortfolioCoin } from "./NestedModal";
export const PortfolioList = () => {
    const [punkts, setPunkts] = useState<PortfolioCoin[]>(() => {
        const stored = localStorage.getItem('portfolioCoins');
        return stored ? JSON.parse(stored) as PortfolioCoin[] : [];
    }); 

    const [totalPortfolioPrice, setTotalPortfolioPrice] = useState<number>();

    useEffect(()=>{
        
        updateData();
    }, []);

    const updateData = () => {
        setPunkts(() => {
            const stored = localStorage.getItem('portfolioCoins');
            return stored ? JSON.parse(stored) as PortfolioCoin[] : [];
        });
        const newAllPrice = punkts
            .map(p => Number(p.price))
            .reduce((sum, cur) => sum + cur, 0);
            
        setTotalPortfolioPrice(newAllPrice);
    }

    const deleteCoinHandler = (symbol: string) =>{
        const newPunkts = punkts.filter(p => p.symbol !== symbol);
        localStorage.setItem('portfolioCoins', JSON.stringify(newPunkts));
        setPunkts(newPunkts);
    }

    return (
        <div className="portfolio-list">
            <div className="portfolio-punkt green">
                <h3>Token</h3>
                <h3>Amount</h3>
                <h3>Price</h3>
                <h3>Total cost</h3>
                <h3>24h changes</h3>
                <h3>% of portfolio</h3>
            </div>
            {punkts.map((p)=>(
                <div 
                className="portfolio-punkt punkt-coin" 
                key={p.symbol}
                onClick={() =>deleteCoinHandler(p.symbol)}>
                    <h5>{p.symbol}</h5>
                    <h5>{p.num}</h5>
                    <h5>{p.price}$</h5>
                    <h5>{(Number(p.price) * p.num).toFixed(2)}$</h5>
                    <h5 className={p.movement[0] === '-' ? 'move-red' : 'move-green'}>
                        {p.movement}
                    </h5>
                    <h5>{((Number(p.price) / Number(totalPortfolioPrice)) * 100).toFixed(2)}%</h5>
                </div>
            ))
             }
        </div>
    )
}
