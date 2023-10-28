import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { StockExchange } from "../components/StockExchange";

export const Root = () => {
    const { user, setToken } = useContext(AuthContext);

    const handleClickLogout = () => {
        setToken(undefined);
    };

    return (
        <div>
            <h1>Welcome to the best stock exchange.</h1>

            {!user && <>
                <a href="/signup">Signup</a> <br />
                <a href="/login">Login</a> <br />
            </>}
            
            <a href="/companies">Browse companies</a> <br />

            {user && <>
                <button onClick={handleClickLogout}>Logout</button> <br />
                <StockExchange />
            </>}
        </div>
    );
};