import { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [input, setInput] = useState("");
  const [displayCoin, setDisplayCoin] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
    if(e.target.value === ''){
      setDisplayCoin(allCoin)
    }
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the {`world's`} largest cryptocurrency marketplace. Sign up
          to explore more about cryptos.
        </p>
        <form onSubmit={searchSubmit}>
          <input
            type="text"
            onChange={inputHandler}
            value={input}
            placeholder="Search crypto.."
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className="market-cap"> Market Cap</p>
        </div>
        {displayCoin.length === 0 ? (
          <p className="not-found">Not Found</p>
        ) : (
          displayCoin.slice(0, 10).map((item, index) => {
            const {
              id,
              market_cap_rank,
              name,
              image,
              symbol,
              current_price,
              price_change_percentage_24h,
              market_cap,
            } = item;
            return (
              <Link to={`/coin/${id}`} className="table-layout" key={index}>
                <p>{market_cap_rank}</p>
                <div>
                  <img src={image} alt="" />
                  <p>{name + "-" + symbol}</p>
                </div>
                <p>
                  {currency.symbol} {current_price.toLocaleString()}
                </p>
                <p
                  className={price_change_percentage_24h > 0 ? "green" : "red"}
                >
                  {Math.floor(price_change_percentage_24h * 100) / 100}
                </p>
                <p className="market-cap">{market_cap.toLocaleString()}</p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
