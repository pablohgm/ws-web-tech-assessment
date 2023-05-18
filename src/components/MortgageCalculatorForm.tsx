import React from 'react';
import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  Select,
  Box,
  Text,
  Collapse,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMortgageCalculator } from '../hooks/useMortgageCalculator';
import { MortgageResultCard } from './MortgageResultCard';
import { CustomNumberInput } from './CustomNumberInput';
import { validationSchema } from '../schemas/validationSchema';

interface FormData {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: string;
}

export const MortgageCalculatorForm: React.FC = () => {
  const { loading, result, calculateMortgage } = useMortgageCalculator();
  const formik = useFormik<FormData>({
    initialValues: {
      propertyPrice: 0,
      downPayment: 0,
      annualInterestRate: 0,
      amortizationPeriod: 5,
      paymentSchedule: 'monthly',
    },
    validationSchema,
    onSubmit: async (formData: FormData) => {
      await calculateMortgage(formData);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const data = parseFloat(value);

    formik.setFieldValue(name, data);
  };

  return (
    <Box width='400px' mx='auto'>
      <Text fontSize='3xl' mb={8}>
        Mortgage Calculator
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <CustomNumberInput
            subText='$'
            isTouched={formik.touched.propertyPrice}
            value={formik.values.propertyPrice}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            isRequired={true}
            label='Property Price'
            placeholder='Insert the Property Price'
            name='propertyPrice'
            errors={formik.errors.propertyPrice}
          />

          <CustomNumberInput
            subText='$'
            isTouched={formik.touched.downPayment}
            value={formik.values.downPayment}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.downPayment}
            isRequired={true}
            label='Down Payment'
            placeholder='Insert the Down Payment'
            name='downPayment'
          />

          <CustomNumberInput
            subText='%'
            isTouched={formik.touched.annualInterestRate}
            value={formik.values.annualInterestRate}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.annualInterestRate}
            isRequired={true}
            label='Annual Interest Rate'
            placeholder='Insert the Annual Interest Rate'
            name='annualInterestRate'
          />

          <CustomNumberInput
            isTouched={formik.touched.amortizationPeriod}
            value={formik.values.amortizationPeriod}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.amortizationPeriod}
            isRequired={true}
            label='Amortization Period (5-30 years)'
            placeholder='Insert the Annual Interest Rate'
            name='amortizationPeriod'
          />

          <FormControl isRequired>
            <FormLabel>Payment Schedule</FormLabel>
            <Select
              name='paymentSchedule'
              value={formik.values.paymentSchedule}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value='monthly'>Monthly</option>
              <option value='bi-weekly'>Biweekly</option>
              <option value='accelerated-bi-weekly'>Accelerated bi-weekly</option>
            </Select>
          </FormControl>

          <Button type='submit' colorScheme='blue' isLoading={loading} isDisabled={!formik.isValid}>
            Calculate
          </Button>
        </Stack>
      </form>
      <Collapse in={!!result} animateOpacity>
        <Box mt={5}>{result && <MortgageResultCard monthlyPayment={result} />}</Box>
      </Collapse>
    </Box>
  );
};
