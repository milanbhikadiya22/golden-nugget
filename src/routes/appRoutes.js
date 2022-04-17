import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import History from "../hoc/History";
import Home from "../pages/home/Home";

const AppRoute = () => {

  const [account, setAccount] = useState();
  const contractAddress = "0x5d975D82897687307aa4158BA52B884E030BEaEF";
  const contractAbi = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ref",
          "type": "address"
        }
      ],
      "name": "BuryGold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "NuggetRewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    { "inputs": [{ "internalType": "address", "name": "ref", "type": "address" }], "name": "buyGold", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "eth", "type": "uint256" }, { "internalType": "uint256", "name": "contractBalance", "type": "uint256" }], "name": "calculateGoldBuy", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "eth", "type": "uint256" }], "name": "calculateGoldBuySimple", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Gold", "type": "uint256" }], "name": "calculateGoldsell", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "adr", "type": "address" }], "name": "getGoldSinceLastBury", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "adr", "type": "address" }], "name": "getMyGold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "adr", "type": "address" }], "name": "getMyMiners", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "seedMarket", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "sellGold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]


  return (
    <BrowserRouter history={History}>
      <Routes>
        <Route exact path={"/"} element={
          <Home account={account} setAccount={setAccount} contractAddress={contractAddress} contractAbi={contractAbi} />
        } />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoute;