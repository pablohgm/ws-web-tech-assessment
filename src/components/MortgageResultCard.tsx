import React from 'react';
import {
  Stack,
  Box,
  Text,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
} from '@chakra-ui/react';

interface MortgageResultCardProps {
  monthlyPayment: number;
}

export const MortgageResultCard: React.FC<MortgageResultCardProps> = ({ monthlyPayment }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Mortgage Payment</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='2'>
          <Box>
            <Heading size='xs'>Mortgage Monthly Payment calculation result:</Heading>
            <Text pt='2' fontSize='2xl'>{`$ ${monthlyPayment}`}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
