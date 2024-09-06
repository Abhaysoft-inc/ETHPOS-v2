import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import AddressContext from '../context/walletConnectContext';
import contractABI from './contract.abi.json'; //abi

export default function AddShopDetails() {
    const { account } = useContext(AddressContext); // Get account from context
    const [shopName, setShopName] = useState('');
    const navigate = useNavigate();
    const contractAddress = '0x0B12fd7f73549F7b0D97728C91d036a8Dd487EbA'; // Replace with your contract address

    useEffect(() => {
        // Check if the shop is already registered when the component loads
        const checkIfShopRegistered = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, contractABI, provider);

                // Fetch the shop name using the account address
                const name = await contract.getShopName(account);

                if (name) {
                    // If a shop name is returned, navigate to the homepage
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error checking shop registration:', error);
            }
        };

        if (account) {
            checkIfShopRegistered();
        }
    }, [account, navigate]);

    const handleShopRegistration = async () => {
        if (!shopName) {
            alert('Please enter a shop name');
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Register the shop with the entered shop name
            const tx = await contract.registerShop(shopName);
            await tx.wait(); // Wait for the transaction to be mined

            // After successful registration, navigate to the homepage
            navigate('/home');
        } catch (error) {
            console.error('Error registering shop:', error);
            alert('Failed to register the shop. Please try again.');
        }
    };

    return (
        <>
            <div className="text-white">
                <p className="text-center text-white text-4xl mt-16 font-bold">ETHPOS</p>

                <div className="content mt-6">
                    <p className="text-center text-xl">Let's finish adding your shop details</p>

                    <div className="">
                        <img src="/images/shop.jpg" className="invert p-24" alt="" />
                    </div>

                    <div className="flex justify-center">
                        <input
                            type="text"
                            placeholder="Shop Name"
                            className="bg-black border border-white text-center p-2 text-lg w-72"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            className="border border-white py-3 px-10 text-xl rounded-md hover:bg-white hover:text-black font-bold"
                            onClick={handleShopRegistration}
                        >
                            Start using ETHPOS
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
