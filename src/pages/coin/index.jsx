import { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart";
const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistorical] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-yTXDXkYxC6SzLGjJqcxAVsm6",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };
  const fetchHistorical = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-yTXDXkYxC6SzLGjJqcxAVsm6",
      },
    };
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistorical(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistorical();
  }, [currency]);
  if ((coinData, historicalData)) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData?.image?.large} alt="" />
          <p>
            <b>
              {coinData?.name} {coinData?.symbol.toUpperCase()}
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData?.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Currency Price</li>
            <li>{currency.symbol} {coinData?.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>{currency.symbol} {coinData?.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol} {coinData?.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol} {coinData?.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin" />
      </div>
    );
  }
};

export default Coin;
