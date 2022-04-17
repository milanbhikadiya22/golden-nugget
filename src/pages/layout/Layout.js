import React from "react";
import Header from "../../component/header/Header";

const LayoutContainer = (props) => {

    return (
        <div className="layout-wrapper">
            <div className="header-wrapper">
                <Header account={props.account} setAccount={props.setAccount} contractAbi={props.contractAbi} contractAddress={props.contractAddress} />
            </div>
            <div className="body-wrapper">
                {props.children}
            </div>
        </div>
    );
};

export default LayoutContainer;
 