import "./home.scss";
import React, { useEffect, useState } from "react";
import twitter from "../../assets/twitter.png";
import telegram from "../../assets/telegram.png";
import LayoutContainer from "../layout/Layout";

const Contract = ({ walletDetail, contractAbi, contractAddress }) => {

    const onBuryGold = async () => {
        let web3 = new window.Web3(window.web3.currentProvider);
        const accounts = await window.ethereum.enable();

        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const bury = await contract.methods.BuryGold(accounts[0]).send({ from: accounts[0] }) // buryGold
        console.log(bury);
        if (bury && bury.status) {

        }
    };
    const onSellGold = async () => {
        console.log('teste');
        let web3 = new window.Web3(window.web3.currentProvider);
        const accounts = await window.ethereum.enable();

        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const sell = await contract.methods.sellGold().send({ from: accounts[0] }) // sell
        console.log(sell);
        if (sell && sell.status) {

        }
    };
    const [value, setValue] = useState(0);

    return <div className="contract-container">
        <div className="contract-card">
            <div className="contract-card-info">
                <span>Contract</span>
                <span>{walletDetail['contractBalance']}</span>
            </div>
            <div className="contract-card-info">
                <span>Wallet</span>
                <span>{walletDetail['userBalance']} BNB</span>
            </div>
            <div className="contract-card-info">
                <span>Your Beans</span>
                <span>{walletDetail['myGold']}</span>
            </div>
            <div className="contract-card-footer">
                <span>Your Rewards</span>
                <span>{walletDetail['myRewards']} BNB</span>
            </div>
            <div className="contract-card-footer">
                <button onClick={() => onBuryGold()}>Bury Gold</button>
                <button onClick={() => onSellGold()}>Sell Gold</button>
            </div>
        </div>
    </div>
};

const OtherInfo = () => {

    const [nutritionDetail, setNutritionDetail] = useState({
        dailyReturn: 0,
        apr: 0,
        devFee: 0
    });

    return <div className="right-card-container">
        <div className="nutrition-card">
            <div className="nutrition-card-info nutrition-header">
                <span>Nutrition  Facts</span>
            </div>
            <div className="nutrition-card-info">
                <span>Daily Return</span>
                <span>{nutritionDetail['dailyReturn']}</span>
            </div>
            <div className="nutrition-card-info">
                <span>APR</span>
                <span>{nutritionDetail['apr']}</span>
            </div>
            <div className="nutrition-card-info">
                <span>Dev Fee</span>
                <span>{nutritionDetail['devFee']}</span>
            </div>
        </div>
    </div>
};

const AnimationComponent = ({ index }) => {
    return <div className="animation-component">

    </div>
};

const Home = ({ contractAbi, contractAddress, account, setAccount }) => {

    const [animation, setAnimation] = useState([0, 1, 2, 3, 4, 5]);
    const [value, setValue] = useState(0);
    const [walletDetail, setWalletDetail] = useState({
        contractBalance: 0,
        userBalance: 0,
        myGold: 0,
        myRewards: 0
    });

    const getDetailsByWeb3 = async () => {
        let web3 = new window.Web3(window.web3.currentProvider);
        const accounts = await window.ethereum.enable();

        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        let walletDetail = {};

        const contractbalance = await web3.eth.getBalance(contractAddress); // contractbalance 10**18
        walletDetail['contractBalance'] = (contractbalance / 10 ** 18).toFixed(3);

        const userBalance = await web3.eth.getBalance(accounts[0]); // userbalance
        walletDetail['userBalance'] = (userBalance / 10 ** 18).toFixed(3);

        const myGold = await contract.methods.getMyMiners(accounts[0]).call(); // your berans/gold
        console.log(myGold);
        const fGold = parseFloat(myGold);
        walletDetail['myGold'] = fGold.toFixed(3);

        try {
            const myRewards = await contract.methods.NuggetRewards(accounts[0]).call();
            walletDetail['myRewards'] = (myRewards / 10 ** 18).toFixed(4);
        } catch (e) {
            walletDetail['myRewards'] = 0;
        }
        setWalletDetail(walletDetail)
    };

    useEffect(() => {
        if (account) {
            if (window.web3 && window.ethereum)
                getDetailsByWeb3();
        }
    }, [account]);

    const onHireMiners = async () => {
        console.log('teste');
        let web3 = new window.Web3(window.web3.currentProvider);
        const accounts = await window.ethereum.enable();

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const amount = web3.utils.toWei(value.toString(), "ether")
        console.log(amount);
        const afterAdd = await contract.methods.buyGold(accounts[0]).send({ from: accounts[0], value: amount }) // buyGOld
        if (afterAdd && afterAdd.status) {
            getDetailsByWeb3()
        }
    };

    return (
        <LayoutContainer account={account} setAccount={setAccount} contractAbi={contractAbi} contractAddress={contractAddress}>
            <div className="home-container">
                {/* {animation.map((a,index)=><AnimationComponent key={index} index={index} />)} */}
                <div className="home-container-row">
                    <Contract walletDetail={walletDetail} contractAbi={contractAbi} contractAddress={contractAddress}></Contract>
                    <div className="other-info-column" >
                        <div className="other-info-input-block">
                            <div className="contract-card-info-input">
                                <input type="text" value={value} onChange={(e) => {
                                    if (!e.target.value || e.target.value.match(/^-?\d*\.?\d*$/))
                                        setValue(e.target.value);
                                }} />
                                <span>BNB</span>
                            </div>
                            <div className="contract-card-info">
                                <button disabled={!value} onClick={() => onHireMiners()} >Hire Miners</button>
                            </div>
                        </div>
                        <OtherInfo></OtherInfo>
                    </div>
                </div>
                <div className="refferal-card">
                    <div className="refferal-card-info refferal-header">
                        <span>Refferal Link</span>
                    </div>
                    <div className="refferal-card-info">
                        <input />
                    </div><div className="refferal-card-info">
                        <p>Earn 12% of the BNB used to bake beans from anyone who uses your referral link</p>
                    </div>
                </div>
                <img className="telegram" src={telegram} alt="telegram" />
                <img className="twitter" src={twitter} alt="twitter" />
            </div>
        </LayoutContainer>
    );
};

export default Home;
