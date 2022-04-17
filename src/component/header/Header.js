import "./header.scss";
import theme from "../../assets/brightness.png";
import React, { useEffect, useState } from "react";

const Header = ({ contractAbi, contractAddress,account,setAccount }) => {

    const [darkTheme, setDarkTheme] = useState(true);

    console.log(account);

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
            console.log("Please Install Metamask")
        }
        else {
            console.log("Metamask is installed");
        }
    };

    useEffect(() => {
        checkWalletIsConnected();
    }, []);

    const connectWalletHandler = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please Install Metamask");
            return;
        }
        try {
            const accounts = await ethereum.request({ "method": "eth_requestAccounts" });
            if(accounts && accounts[0]){
                setAccount(accounts[0]);
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
                <button disabled={account} onClick={() => connectWalletHandler()} >Connect</button>
            </div>
        </div>
    );

};

export default Header;
