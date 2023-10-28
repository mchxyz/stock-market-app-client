import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useContext(AuthContext);
    
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const { authToken } = await response.json();
            setToken(authToken);
            window.location.href = "/";
        }
        else {
            const data = await response.json();
            if(data?.message === "Incorrect username or password.") {
                alert(data.message);
            }
        }
    };

    const handleChangeUsername = (e) => setUsername(e.target.value);

    const handleChangePassword = (e) => setPassword(e.target.value);
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmitForm}>
                <label>Username</label> <br />
                <input type="text" name="username" onChange={handleChangeUsername} value={username} /> <br />
                <label>Password</label> <br />
                <input type="password" name="password" onChange={handleChangePassword} value={password} /> <br />
                <label>Confirm password</label> <br />
                <input type="submit" />
            </form>
        </div>
    );
};