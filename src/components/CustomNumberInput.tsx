import React, { ChangeEvent, FC } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

export interface CustomInputProps {
  label: string;
  name: string;
  value: string | number;
  placeholder?: string;
  subText?: string;
  pattern?: string;
  type?: string;
  defaultValue?: number;
  isTouched?: boolean;
  isRequired: boolean;
  errors?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomNumberInput: FC<CustomInputProps> = ({
  label,
  name,
  value,
  placeholder,
  subText,
  pattern,
  type,
  defaultValue,
  isTouched,
  isRequired,
  errors,
  onChange,
  onBlur,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    onBlur(e);
  };

  return (
    <FormControl isInvalid={isTouched && !!errors} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <InputGroup display="block">
        {subText && <InputLeftElement pointerEvents='none' children={subText} />}
        <NumberInput defaultValue={defaultValue}>
          <NumberInputField
            data-type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            required={isRequired}
            placeholder={placeholder}
            pattern={pattern}
            pl={subText && 8}
          />
        </NumberInput>
      </InputGroup>
      {errors && <FormErrorMessage>{errors}</FormErrorMessage>}
    </FormControl>
  );
};
