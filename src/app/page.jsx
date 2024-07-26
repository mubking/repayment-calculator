"use client";
import { useState } from "react";
import { FaCalculator } from "react-icons/fa";

export default function Home() {
  // State for input and validation
  const [inputValue, setInputValue] = useState('');
  const [termValue, setTermValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for calculated results
  const [monthlyRepayment, setMonthlyRepayment] = useState('0');
  const [totalRepayment, setTotalRepayment] = useState('0');

  // Validation checks
  const isInputInvalid = isSubmitted && !inputValue;
  const isTermInvalid = isSubmitted && !termValue;
  const isRateInvalid = isSubmitted && !rateValue;

  const handleInputChange = (e) => {
    setInputValue(e.target.value.replace(/[^0-9,.]/g, '')); // Allow only numbers, commas, and dots
  };

  const handleTermChange = (e) => {
    setTermValue(e.target.value.replace(/[^0-9]/g, '')); // Allow only numbers
  };

  const handleRateChange = (e) => {
    setRateValue(e.target.value.replace(/[^0-9.]/g, '')); // Allow only numbers and dots
  };

  const handleCardPaymentClick = () => {
    setIsSubmitted(true);
    if (inputValue && termValue && rateValue) {
      calculateRepayments();
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClearAll = () => {
    // Clear all input values and reset state
    setInputValue('');
    setTermValue('');
    setRateValue('');
    setSelectedOption('');
    setIsSubmitted(false);
    setMonthlyRepayment('0');
    setTotalRepayment('0');
  };

  // Format number with comma as thousand separator
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Calculate repayments
  const calculateRepayments = () => {
    const principal = parseFloat(inputValue.replace(/,/g, '')); // Remove commas for calculation
    const years = parseInt(termValue, 10);
    const interestRate = parseFloat(rateValue);

    if (!principal || !years || isNaN(interestRate)) return;

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;

    const monthlyRepayment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalRepayment = monthlyRepayment * numberOfPayments;

    // Update state with formatted results
    setMonthlyRepayment(formatNumber(monthlyRepayment.toFixed(2)));
    setTotalRepayment(formatNumber(totalRepayment.toFixed(2)));
  };

  return (
    <section className="bg-[#E3F4FC] min-h-screen w-full p-5 flex items-center justify-center">
<div className="flex flex-col md:flex-row w-full md:w-[60%]">
{/* Input and Error Handling Section */}
        <div className="bg-[#FFFFFF] w-full md:w-1/2 min-h-[80vh] text-[#353E44] p-5" style={{ borderTopLeftRadius: "30px" }}>
          <div className="flex justify-between">
            <h1 className="text-lg">Mortgage Calculator</h1>
            <button 
  className="relative text-blue-500 hover:text-blue-700" 
  onClick={handleClearAll}
  style={{
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px' // Adjust this value to move the underline
  }}
>
  Clear all
</button>

          </div>
          
          <p className="mt-4">Mortgage Amount</p>
          <div className="mt-4">
            <div
              className={`flex items-center border ${isInputInvalid ? 'border-red-500' : 'border-gray-300'} rounded-md overflow-hidden`}
            >
              <span className="bg-[#E3F4FC] p-2">₦</span>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="flex-grow p-2 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            {isInputInvalid && (
              <span className="text-red-500 text-sm mt-1">This field is required</span>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-5 gap-3">
            <div>
              <p>Mortgage Term </p>
              <div className="mt-4">
                <input
                  type="text"
                  value={termValue}
                  onChange={handleTermChange}
                  className={`form-input border ${isTermInvalid ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 w-full`}
                  placeholder="Enter term in years"
                />
                {isTermInvalid && (
                  <span className="text-red-500 text-sm mt-1">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <p>Interest Rate (%)</p>
              <div className="mt-4">
                <input
                  type="text"
                  value={rateValue}
                  onChange={handleRateChange}
                  className={`form-input border ${isRateInvalid ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 w-full`}
                  placeholder="Enter interest rate"
                />
                {isRateInvalid && (
                  <span className="text-red-500 text-sm mt-1">This field is required</span>
                )}
              </div>
            </div>
          </div>

          <h1 className="mt-5">Mortgage Type</h1>
          <div>
            <div
              className={`flex gap-5 mt-5 p-3 ${selectedOption === 'repayment' ? 'bg-green-500' : 'bg-white'}`}
              style={{ border: "2px solid #133040", borderRadius: "5px" }}
            >
              <input
                type="radio"
                name="paymentOption"
                value="repayment"
                checked={selectedOption === 'repayment'}
                onChange={handleRadioChange}
              />
              <p className="text-lg">Repayment</p>
            </div>
            <div
              className={`flex gap-5 mt-5 p-3 ${selectedOption === 'interest' ? 'bg-green-500' : 'bg-white'}`}
              style={{ border: "2px solid #133040", borderRadius: "5px" }}
            >
              <input
                type="radio"
                name="paymentOption"
                value="interest"
                checked={selectedOption === 'interest'}
                onChange={handleRadioChange}
              />
              <p className="text-lg">Interest Only</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 mt-4 bg-[#D9DB30] p-5 cursor-pointer"
            style={{ borderRadius: "50px" }}
            onClick={handleCardPaymentClick}
          >
            <div><FaCalculator /></div>
            <div className="text-lg">Calculate Repayments</div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-[#133040] w-full md:w-1/2 min-h-[80vh]">
          <div className="bg-[#133040] w-full h-full p-5 capitalize" style={{ borderBottomLeftRadius: "50px" }}>
            <h1 className="text-white text-2xl">Your Results</h1>
            <p className="mt-5 text-[#5E7D90] text-lg">
              Your results are shown below based on the information you provided. To adjust the results, edit the forms and click "Calculate Repayments" again.
            </p>
            <div className="bg-[#0E2431] w-full mt-5 h-[37vh]" style={{ borderTop: "5px solid #CBD667", borderTopLeftRadius: "15px" }}>
              <div className="p-5">
                <p className="text-lg text-[#91ADBE]">Your monthly repayments</p>
                <h1 className="text-[#D5D72E] text-3xl mt-3">₦{monthlyRepayment}</h1>
                <div className="mt-4" style={{ border: "1px solid #142A36" }}></div>
                <h2 className="mt-3 text-[#91ADBE]">Total you'll repay over the term</h2>
                <h1 className="text-white mt-5">₦{totalRepayment}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
