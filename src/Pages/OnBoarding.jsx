import { ethers } from 'ethers';
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AddressContext from '../context/walletConnectContext';

export default function OnBoarding() {

    const { setAccount } = useContext(AddressContext); //setting account in context
    // const [account, setAccount] = useState(null);
    const navigate = useNavigate() //using to navigate

    useEffect(() => {
        //checking if account already exists in localstorage
        const storedAccount = localStorage.getItem('account');
        if (storedAccount) {
            setAccount(storedAccount);
            navigate('/shop-details');
        }
    }, [setAccount, navigate]);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {

                //creating connection to wallet
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send('eth_requestAccounts', []);
                //setting value of account address to setAccount
                setAccount(accounts[0]);
                //saving in localstorage
                localStorage.setItem('account', accounts[0]);
                //navigating to home
                navigate('/shop-details')


            } catch (error) {
                console.log(error);

            }
        }

    }
    return (
        <>

            <div className="bg-black">
                <p className="text-center text-white text-4xl mt-16 font-bold">ETHPOS</p>

                <div className="content lg:flex lg: justify-center">

                    <img src="/images/pos.png" className='p-10 mt-10 lg:mt-20 lg:h-64' alt="" />

                    <div className="flex justify-center mt-36 lg:mt-36 lg:h-24 lg:ml-24 mb-10">
                        <button className='text-white border border-white py-3 px-10 rounded-lg hover:bg-white hover:text-black text-xl' onClick={connectWallet}>Connect Wallet</button>
                    </div>

                </div>


            </div>




        </>
    )
}
