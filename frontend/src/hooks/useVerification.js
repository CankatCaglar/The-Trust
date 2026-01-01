import { useState, useCallback } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VERIFICATION_STEPS = [
  { step: 1, name: 'AI Pattern Analysis', message: 'Analyzing address pattern...' },
  { step: 2, name: 'On-Chain Scan', message: 'Scanning blockchain data...' },
  { step: 3, name: 'AI Risk Detection', message: 'Checking for suspicious patterns...' },
  { step: 4, name: 'Terminal Verification', message: 'Running CLI verification...' }
];

export const useVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const resetVerification = useCallback(() => {
    setIsVerifying(false);
    setCurrentStep(0);
    setStepStatuses([]);
    setResult(null);
    setError(null);
  }, []);

  const verifyAddress = useCallback(async (address) => {
    if (!address || address.trim() === '') {
      setError('Please enter a wallet address');
      return;
    }

    resetVerification();
    setIsVerifying(true);
    setError(null);

    // Initialize step statuses
    const initialStatuses = VERIFICATION_STEPS.map((step, index) => ({
      ...step,
      status: index === 0 ? 'processing' : 'pending',
      result: null
    }));
    setStepStatuses(initialStatuses);

    // Simulate step-by-step verification with delays
    for (let i = 0; i < VERIFICATION_STEPS.length; i++) {
      setCurrentStep(i + 1);
      
      // Update current step to processing
      setStepStatuses(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'processing' : index < i ? 'completed' : 'pending'
      })));

      // Wait for simulated processing time
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

      // If it's the last step, make the actual API call
      if (i === VERIFICATION_STEPS.length - 1) {
        try {
          console.log('Making API call to:', `${API}/verify`);
          console.log('Request payload:', { address });
          
          const response = await axios.post(`${API}/verify`, { address }, {
            timeout: 60000, // 60 seconds timeout for slow RPC
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          console.log('API Response:', response.data);
          console.log('Response steps:', response.data.steps);
          
          // Update all steps with actual results
          setStepStatuses(response.data.steps.map(step => ({
            ...step,
            status: 'completed'
          })));
          
          setResult(response.data);
        } catch (err) {
          console.error('API Error:', err);
          console.error('Error response:', err.response);
          setError(err.response?.data?.detail || 'Verification failed. Please try again.');
          setStepStatuses(prev => prev.map((step, index) => ({
            ...step,
            status: index === i ? 'failed' : step.status
          })));
        }
      } else {
        // Mark current step as completed
        setStepStatuses(prev => prev.map((step, index) => ({
          ...step,
          status: index === i ? 'completed' : step.status
        })));
      }
    }

    setIsVerifying(false);
  }, [resetVerification]);

  return {
    isVerifying,
    currentStep,
    stepStatuses,
    result,
    error,
    verifyAddress,
    resetVerification
  };
};

export default useVerification;
