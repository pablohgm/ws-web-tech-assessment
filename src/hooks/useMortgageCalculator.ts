import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

interface MortgageFormData {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: string;
}

export const useMortgageCalculator = () => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const calculateMortgage = async (formData: MortgageFormData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // In a real project url should be in .env file
      const response = await fetch('http://localhost:3000/mortgage/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate mortgage');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, calculateMortgage };
};
