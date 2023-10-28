import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const StockExchange = () => {
    const { user, getToken } = useContext(AuthContext);

    const [ticker, setTicker] = useState("");
    const [amount, setAmount] = useState(1);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const token = getToken();
        fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                setStocks(data.user.stocks);
            });
    }, []);

    const handleChangeTicker = (e) => setTicker(e.target.value.toUpperCase());

    const handleChangeAmount = (e) => setAmount(e.target.value);

    const handleClickBuy = async (e) => {
        const token = getToken();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/stocks`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ ticker, amount }),
        });

        const data = await response.json();
        // const newStocks = stocks.map(stock => stock.ticker === ticker ? data : stock);
        // console.log(newStocks);
        // setStocks(newStocks);
        setStocks(data.user.stocks);
    };

    return (
        <div>
            <h2>Hello {user.username}!</h2>
            <label>Ticker:&nbsp;</label>
            <input type="text" onChange={handleChangeTicker} value={ticker} />
            <input type="number" onChange={handleChangeAmount} value={amount} min={0} />
            <button onClick={handleClickBuy}>buy</button>
            {stocks.map((stock, idx) => (
                <div key={`stock-${idx}`} className="border m-1">
                    <div>{stock.ticker}</div>
                    <div>Quantity: {stock.amount}</div>
                    <div>Price: ${stock.price}</div>
                    <div>Total: ${stock.price * stock.amount}</div>
                </div>
            ))}
        </div>
    );
};