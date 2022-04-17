import "./home.scss";
import React, { useEffect, useState } from "react";
import twitter from "../../assets/twitter.png";
import telegram from "../../assets/telegram.png";
import LayoutContainer from "../layout/Layout";
import { ethers } from "ethers";

const Contract = () => {

    const [walletDetail, setWalletDetail] = useState({
        contract: 0,
        wallet: 0,
        beans: 0,
        rewards: 0
    });

    const [value, setValue] = useState(0);

    return <div className="contract-container">
        <div className="contract-card">
            <div className="contract-card-info">
                <span>Contract</span>
                <span>{walletDetail['contract']}</span>
            </div>
            <div className="contract-card-info">
                <span>Wallet</span>
                <span>{walletDetail['wallet']}</span>
            </div>
            <div className="contract-card-info">
                <span>Your Beans</span>
                <span>{walletDetail['beans']}</span>
            </div>
            <div className="contract-card-footer">
                <span>Your Rewards</span>
                <span>0 BNB</span>
            </div>
            <div className="contract-card-footer">
                <button disabled={!value} >Bury Gold</button>
                <button disabled={!value}>Sell Gold</button>
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

    const getDetails = async () => {
        const { ethereum } = window;
        // if (ethereum) {
        //     const provider = new ethers.providers.Web3Provider(ethereum);
        //     const signer = provider.getSigner();
        //     const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        //     console.log(contract);
        //     const balance = await contract.getBalance();
        //     console.log(balance / 10 ** 18, 'balance');
        //     const myGold = await contract.getMyMiners(account) // your berans/gold
        //     console.log(myGold / 10 ** 18);
        //     const myRewards = await contract.NuggetRewards(account) // your berans/gold
        //     console.log(myRewards / 10 ** 18); // if error then show 0


        //     // const balanceUser = await contract.getBalance(account);
        // }
        // let web3 = new Web3(window.web3.currentProvider);
        // const accounts = await ethereum.enable();

        // const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // const contractBalance = await web3.eth.getBalance(contractAddress) // contractbalance 10**18
        // const balance = await web3.eth.getBalance(accounts[0]) // contractbalance 10**18

        // console.log(contractBalance,balance);
    };

    useEffect(() => {
        console.log(account);
        if (account) {
            getDetails();
        }
    }, [account]);

    const onHireMiners = () => {

    };

    return (
        <LayoutContainer account={account} setAccount={setAccount} contractAbi={contractAbi} contractAddress={contractAddress}>
            <div className="home-container">
                {/* {animation.map((a,index)=><AnimationComponent key={index} index={index} />)} */}
                <div className="home-container-row">
                    <Contract></Contract>
                    <div className="other-info-column" >
                        <div className="other-info-input-block">
                            <div className="contract-card-info-input">
                                <input type="text" value={value} onChange={(e) => {
                                    if (!e.target.value || e.target.value.match(/^[0-9\s]+$/))
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
