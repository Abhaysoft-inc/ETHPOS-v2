import React from 'react'
import { IoArrowBack, IoArrowBackCircle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function AddPayment() {

    const navigate = useNavigate()


    function handleBackButton() {

        navigate(-1);

    }
    return (
        <>

            <div className="text-white">

                <IoArrowBackCircle className='mt-6 ml-3' size={35} onClick={handleBackButton} />
                <div className="rounded-[20px] bg-gray-900 mt-4 mx-3 px-3 py-5">
                    <p className="text-2xl font-semibold">Add New Payment</p>

                    <div className="form-group mt-6">
                        <label htmlFor="amount">Amount in USD: </label>
                        <input type="number" className='amount text-center rounded-[40px] px-2 py-1 ml-4 text-xl text-black' placeholder='Ex: $5,500' />

                    </div>

                    <div className="btn flex justify-center my-8 ">
                        <button className='bg-[#353638] px-10 py-3 font-semibold rounded-full text-xl'>Receive Now!</button>
                    </div>


                </div>
            </div>


        </>
    )
}
