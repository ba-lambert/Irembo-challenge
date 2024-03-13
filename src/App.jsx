import React, { useState } from 'react';
import OwnerDetails from './pages/form';
import CountrySelector from './components/CountriesList';
import BusinessDetails from './components/BusinessDetails';
import ProductDetails from './components/ProductDetails';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerDetails: {},
    businessDetails: {},
    productDetails: {}
  });

  const handleOwnerDetailsSubmit = (data) => {
    setFormData({ ...formData, ownerDetails: data });
    setStep(step + 1);
  };
  console.log("Data from " + JSON.stringify(formData));

  const handleBusinessDetailsSubmit = (data) => {
    setFormData({ ...formData, businessDetails: data });
    setStep(step + 1);
  };
  console.log("Data from " + JSON.stringify(formData));
  const handleProductDetailsSubmit = (data) => {
    console.log("clicked");
    setFormData({ ...formData, productDetails: data });
    console.log('All form data:', JSON.stringify(formData));
  };
  console.log("Data from " + JSON.stringify(formData));
  const handleNextStep = () => {
    setStep(step + 1); 
  };

  return (
    <div className='flex justify-center items-center bg-white w-screen flex-col'>
      <div className=''>
        <p className='text-blue-500 font-bold text-5xl text-center'>RISA</p>
      </div>
      <OwnerDetails onSubmit={handleOwnerDetailsSubmit} onNext={handleNextStep} visible={step === 1} />
      <BusinessDetails onSubmit={handleBusinessDetailsSubmit} onNext={handleNextStep} visible={step === 2} />
      <ProductDetails onSubmit={handleProductDetailsSubmit} visible={step === 3} />
    </div>
  );
}
