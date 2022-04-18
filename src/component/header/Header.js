import "./header.scss";
import theme from "../../assets/brightness.png";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

const Header = ({ account, setAccount }) => {

    const [darkTheme, setDarkTheme] = useState(true);
    const { addToast } = useToasts();

    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty("--primary", darkTheme ? "#17161b" : "#ffffff");
        root?.style.setProperty("--secondary", darkTheme ? "#febf32" : "#febf32");
        root?.style.setProperty("--primary-text-color", darkTheme ? "white" : "black");
        root?.style.setProperty("--secondary-text-color", darkTheme ? "black" : "black");
        root?.style.setProperty("--border-color", darkTheme ? "#febf32" : "#febf32");
    }, [darkTheme]);

    const checkWalletIsConnected = () => {
        const { ethereum } = window;
        if (!ethereum) {
            addToast(
                "Please Install Metamask",
                {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: "1500",
                }
            );
        }
        else {
            console.log("Metamask is installed");
        }
    };

    useEffect(() => {
        checkWalletIsConnected();
    }, []);

    const connectWalletHandler = async () => {
        if (account && account.length) {
            setAccount([]);
            localStorage.removeItem("account");
            return;
        }
        const { ethereum } = window;
        if (!ethereum) {
            addToast(
                "Please Install Metamask",
                {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: "1500",
                }
            );
            return;
        }
        try {
            const accounts = await ethereum.request({ "method": "eth_requestAccounts" });
            if (accounts && accounts[0]) {
                setAccount(accounts);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="header-container">
            <div className="logo-container">
                <h4 className="logo-text">
                    Golden Nugget
                </h4>
            </div>
            <div className="connect-container">
                <button onClick={() => setDarkTheme(!darkTheme)} ><img src={theme} alt="theme" /></button>
                <button onClick={() => connectWalletHandler()} >{account && account.length ? "Disconnect" : "Connect"} </button>
            </div>
        </div>
    );

};

export default Header;
