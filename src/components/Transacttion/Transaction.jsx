import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../firebase';
import { toast } from 'react-toastify';

// 0xlfshlahfjkh8q9371987111234141198765432
const TransactionForm = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validateWalletAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const validateAmount = (amount) => {
    const numericAmount = parseFloat(amount);
    return !isNaN(numericAmount) && numericAmount >= 0 && numericAmount <= 10000;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate wallet address
    if (!validateWalletAddress(walletAddress)) {
      setErrors({ walletAddress: 'Invalid Ethereum address format' });
      return;
    }

    // Validate amount
    if (!validateAmount(amount)) {
      setErrors({ amount: 'Invalid amount. Please enter a number between 0 and 10,000' });
      return;
    }

    // If everything is valid, proceed with the transaction logic here
    // ...

    // Clear errors and reset form fields
    setErrors({});
    setWalletAddress('');
    setAmount('');
  };

   const addData = async(e) => {
     e.preventDefault();

     try {
        await addDoc(collection(db, "transactions"), {
          address: walletAddress,
          amount:amount  
            
        });
        alert("data submitted")
        setIsSubmit(!isSubmit);
        const message = `Wallet transaction data${isSubmit ? 'submitted' : 'not submitted'}`;

        toast.info(message);
      } catch (e) {
        console.error("Error adding data: ", e);
      }
   }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Transaction Form</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-600">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            name="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={`mt-1 p-2 border ${
              errors.walletAddress ? 'border-red-500' : 'border-gray-300'
            } rounded-md w-full`}
            required
          />
          {errors.walletAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`mt-1 p-2 border ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            } rounded-md w-full`}
            required
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>
        <div className="text-center">
          <button
            onClick={addData}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
