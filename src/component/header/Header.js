import "./header.scss";
import theme from "../../assets/brightness.png";
import React, { useEffect, useState } from "react";

const Header = () => {

    const [darkTheme, setDarkTheme] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty("--primary", darkTheme ? "#17161b" : "#ffffff");
        root?.style.setProperty("--secondary", darkTheme ? "#febf32" : "#febf32");
        root?.style.setProperty("--primary-text-color", darkTheme ? "white" : "black");
        root?.style.setProperty("--secondary-text-color", darkTheme ? "black" : "black");
        root?.style.setProperty("--border-color", darkTheme ? "#febf32" : "#febf32");
    }, [darkTheme]);

    return (
        <div className="header-container">
            <div className="logo-container">
                <h4 className="logo-text">
                    Golden Nugget
                </h4>
            </div>
            <div className="connect-container">
                <button onClick={() => setDarkTheme(!darkTheme)} ><img src={theme} alt="theme"/></button>
                <button>Connect</button>
            </div>
        </div>
    );

};

export default Header;
