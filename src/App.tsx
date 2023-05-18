import * as React from 'react';
import { ChakraProvider, Box, theme, Center } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { MortgageCalculatorForm } from './components/MortgageCalculatorForm';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <ColorModeSwitcher justifySelf='flex-start' display='flex' />
      <Center>
        <MortgageCalculatorForm />
      </Center>
    </Box>
  </ChakraProvider>
);
