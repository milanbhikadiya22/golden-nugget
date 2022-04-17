import "./home.scss";
import React, { useEffect, useState } from "react";
import twitter from "../../assets/twitter.png";
import telegram from "../../assets/telegram.png";
import LayoutContainer from "../layout/Layout";
import { ethers } from "ethers";

const Contract = ({userBalance,contractBalance}) => {

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
                <span>{contractBalance}</span>
            </div>
            <div className="contract-card-info">
                <span>Wallet</span>
                <span>{userBalance}</span>
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
    const [contractBalance,setContractBalance] = useState(0);
    const [userBalance,setUserBalance] = useState(0);

    const getDetails = async () => {
        const { ethereum } = window;
        // web3 = new Web3(window.web3.currentProvider);

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            signer.getAddress().then((add) => {
                console.log(add);
                return provider.getBalance(add)
            }).then((balance) => {
                console.log(balance / 10 ** 18); // meta mask ballence
            })
            console.log(provider,'provider');
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            console.log(contract,'contract');
            const balance = await contract.getBalance();
            setContractBalance(balance / 10 ** 18);
            const myGold = await contract.getMyMiners(account) // your berans/gold
            setUserBalance(myGold / 10 ** 18);
            // const myRewards = await contract.NuggetRewards(account) // your berans/gold
            // console.log(myRewards / 10 ** 18); // if error then show 0
            console.log(ethers,'ether');
            // const amount = ethers.utils().Web3.utils.toWei("0.01", "ether")
            // await contract.methods.buyGold(account).send({ from: account, value: amount }) // buyGOld
            // console.log(amount);
            // const balanceUser = await contract.getBalance(account);
        }
        // let web3 = new Web3(window.web3.currentProvider);
        // const accounts = await ethereum.enable();

        // const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // const contractBalance = await web3.eth.getBalance(contractAddress) // contractbalance 10**18
        // const balance = await web3.eth.getBalance(accounts[0]) // contractbalance 10**18

        // console.log(contractBalance, balance);
    };

    const getDetailsByWeb3 =async () => {
        let web3 = new window.Web3(window.web3.currentProvider);
        const accounts = await window.ethereum.enable();

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const contractbalance = await web3.eth.getBalance(contractAddress) // contractbalance 10**18

        const userBalance = await web3.eth.getBalance(accounts[0]) // userbalance

        const myGold = await contract.methods.getMyMiners("0xb12d34ec804bf0d8872e42b924ca61a449a0f572").call() // your berans/gold

        const myRewards = await contract.methods.NuggetRewards("0xb12d34ec804bf0d8872e42b924ca61a449a0f572").call() // your berans/gold rewards

        console.log(contractbalance/10**18,userBalance,myGold,myRewards);
    };

    useEffect(() => {
        if (account) {
            getDetails();
            if(window.web3 && window.ethereum)
            getDetailsByWeb3();
        }
    }, [account]);

    const onHireMiners = () => {

    };

    return (
        <LayoutContainer account={account} setAccount={setAccount} contractAbi={contractAbi} contractAddress={contractAddress}>
            <div className="home-container">
                {/* {animation.map((a,index)=><AnimationComponent key={index} index={index} />)} */}
                <div className="home-container-row">
                    <Contract contractBalance={contractBalance} userBalance={userBalance}></Contract>
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
