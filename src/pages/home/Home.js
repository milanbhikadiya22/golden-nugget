import "./home.scss";
import React, { useState } from "react";
import twitter from "../../assets/twitter.png";
import telegram from "../../assets/telegram.png";
import LayoutContainer from "../layout/Layout";

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
                <button disabled={!value} >Re-bake</button>
                <button disabled={!value}>Eat Beans</button>
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

const Home = () => {

    const [animation, setAnimation] = useState([0, 1, 2, 3, 4, 5]);

    return (
        <LayoutContainer>
            <div className="home-container">
                {/* {animation.map((a,index)=><AnimationComponent key={index} index={index} />)} */}
                <div className="home-container-row">
                    <Contract></Contract>
                    <div className="other-info-column" >
                        <div className="other-info-input-block">
                            <div className="contract-card-info-input">
                                <input type="text" />
                                <span>BNB</span>
                            </div>
                            <div className="contract-card-info">
                                <button disabled={true} onClick={() => { }} >Bake Beans</button>
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
