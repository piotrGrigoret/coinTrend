import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


type Kline = [
  number,     // openTime
  string,     // open
  string,     // high
  string,     // low
  string,     // close
  string,     // volume
  number,     // closeTime
  string,     // quoteVolume
  number,     // trades
  string,     // takerBaseVolume
  string,     // takerQuoteVolume
  string      // ignore
];

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HistoricalChartInterface {
  symbol: string;
} 

const HistoricalChart: React.FC<HistoricalChartInterface> = ({symbol}) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const res = await axios.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: symbol + 'USDT',
            interval: '1d',
            limit: 50, 
          },
        });

        const data = res.data;

        const times = data.map((kline: Kline) => {
          const date = new Date(kline[0]);
          return date.toLocaleString(); 
        });

        const closePrices = data.map((kline: Kline) => parseFloat(kline[4])); 

        setLabels(times);
        setPrices(closePrices);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchHistoricalData();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${symbol}/USDT (Closing price)`,
        data: prices,
        borderColor: '#3d9970',
        backgroundColor: '#6a6868',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Coin <span className='historical-chat-coinname'>{symbol}</span> rate last days</h2>
      <Line height={'100%'}  data={chartData} />
      
    </div>
  );
};

export default HistoricalChart;
