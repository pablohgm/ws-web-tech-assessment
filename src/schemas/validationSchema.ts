import * as Yup from 'yup';

export const validationSchema = Yup.object({
    propertyPrice: Yup.number()
        .integer('Property Price must be an integer')
        .min(1, 'Property Price must be greater than 0')
        .max(100_000_000, 'Number must be less than  100 million.')
        .required('Property Price is required'),
    downPayment: Yup.number()
        .integer('Down Payment must be an integer')
        .min(1, 'Down Payment must be greater than 0')
        .max(100_000_000, 'Number must be less than  100 million.')
        .required('Down Payment is required'),
    annualInterestRate: Yup.number()
        .transform((value, originalValue) => {
            if (originalValue.toString().split('.')[1]?.length > 2) {
                return parseFloat(originalValue).toFixed(2);
            }
            return value;
        })
        .min(1, 'Annual Interest Rate must be greater than 0')
        .max(99.9, 'Annual Interest Rate must be lower than 100')
        .required('Annual Interest Rate is required'),
    amortizationPeriod: Yup.number()
        .integer('Amortization Period must be an integer')
        .min(5, 'Amortization Period must be between 5 and 30')
        .max(30, 'Amortization Period must be between 5 and 30')
        .required('Amortization Period is required'),
    paymentSchedule: Yup.string().required('Payment Schedule is required'),
})