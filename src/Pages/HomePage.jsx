import React, { useState, useEffect, useContext } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineCallReceived } from "react-icons/md";
import AddressContext from '../context/walletConnectContext';
import axios from 'axios';
import { ethers } from 'ethers';
import contractABI from './contract.abi.json'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const ETHERSCAN_API_KEY = 'P7G3MXPIQ7I2P93DHKDRKIW2P2UEZ27B9P'; // Replace with your Etherscan API key
const ETHERSCAN_BASE_URL = 'https://api-sepolia.etherscan.io/api';
const CONTRACT_ADDRESS = '0x0B12fd7f73549F7b0D97728C91d036a8Dd487EbA'; // Replace with your contract address

export default function HomePage() {

    const account = localStorage.getItem('account');
    // const { account } = useContext(AddressContext); // getting account
    const [balance, setBalance] = useState('0');
    const [shopName, setShopName] = useState('');
    const [receivedTransactions, setReceivedTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            console.log(account)
            if (!account) return;

            try {
                // Fetch balance
                const balanceResponse = await axios.get(`${ETHERSCAN_BASE_URL}?module=account&action=balance&address=${account}&tag=latest&apikey=${ETHERSCAN_API_KEY}`);
                const balanceInWei = balanceResponse.data.result;
                const balanceInEth = ethers.formatEther(balanceInWei);
                setBalance(balanceInEth);
                console.log(balanceInEth);

                // Fetch transactions
                const txResponse = await axios.get(`${ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`);
                const received = txResponse.data.result.filter(tx => tx.to.toLowerCase() === account.toLowerCase());
                setReceivedTransactions(received);


                // Fetch shop details
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
                const name = await contract.getShopName(account);
                if (name) {
                    setShopName(name);
                    console.log(name)
                } else {
                    setShopName('Shop Name Not Found');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, [account]);

    // Slice the account address for display
    const start = account ? account.slice(0, 6) : '';
    const end = account ? account.slice(-4) : '';

    const navigate = useNavigate()

    function handleReceivePayment() {
        navigate('/add-payment')

    }

    return (
        <div className="homepage p-2 text-white">
            {error && <p className="error text-red-500">{error}</p>}
            <p className="greet text-3xl mt-6 ml-6 font-bold">{shopName}</p>
            <p className="soladdress ml-6 overflow-hidden flex mt-1">
                {start}....{end}
                <FaRegCopy className='ml-2 mt-1 mr-3' />
                BAL: <b>{balance} ETH</b>
            </p>

            {/* commands */}
            <div className="flex space-x-10 mt-10 mx-6 justify-center">
                <div className="border-white border w-20 h-20 hover:bg-white" onClick={handleReceivePayment}>
                    <div className="hover:invert">
                        <img src="/images/bitcoin.png" className='scale-50 invert' alt="" /></div>
                    <p className="text-center mt-1">Receive Payments</p>
                </div>
                <div className="border-white border w-20 h-20">
                    <img src="/images/transaction.png" className='scale-50 invert' alt="" />
                    <p className="text-center mt-1">Recent Payments</p>
                </div>
                <div className="border-white border w-20 h-20">
                    <img src="/images/bitcoin.png" className='scale-50 invert' alt="" />
                    <p className="text-center mt-1">Demo</p>
                </div>
            </div>

            {/* recent transactions */}
            <div className="recent-transactions mt-20 ml-6">
                <p className="font-bold text-2xl">Recent Transactions</p>
                {receivedTransactions.length === 0 ? (
                    <p>No recent received transactions found.</p>
                ) : (
                    receivedTransactions.map(tx => (
                        <div className="transactions mt-4 flex" key={tx.hash}>
                            <MdOutlineCallReceived size={30} className='mt-3 mr-2' />
                            <div className="transact">
                                <p>{ethers.formatEther(tx.value)} ETH</p>
                                <p className="add">
                                    <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                                        {tx.from.slice(0, 24)}....
                                    </a>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
