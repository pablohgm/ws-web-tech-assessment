import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CustomNumberInput, CustomInputProps } from './components/CustomNumberInput';

describe('CustomNumberInput', () => {
  const defaultProps: CustomInputProps = {
    label: 'Number Input',
    name: 'numberInput',
    value: '',
    placeholder: 'Enter a number',
    subText: 'Subtext',
    pattern: '\\d*',
    type: 'text',
    defaultValue: 0,
    isTouched: false,
    isRequired: false,
    errors: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders without errors', () => {
    render(<CustomNumberInput {...defaultProps} />);
  });

  it('renders the label', () => {
    render(<CustomNumberInput {...defaultProps} />);
    const labelElement = screen.getByLabelText('Number Input');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the subtext', () => {
    render(<CustomNumberInput {...defaultProps} />);
    const subtextElement = screen.getByText('Subtext');
    expect(subtextElement).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<CustomNumberInput {...defaultProps} />);
    const inputElement = screen.getAllByPlaceholderText('Enter a number')[0] as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '123' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });
});