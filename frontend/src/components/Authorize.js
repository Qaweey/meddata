import React, { useState } from 'react';
import { Box, Stack, Button, Input, useToast } from '@chakra-ui/react';

const Authorize = ({ contract }) => {
  const [address, setaddress] = useState('');

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'User Authorized.',
      description: 'User have been Authorized successfully',
      position: 'top',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  const handleSubmit = async () => {
    try {
      const response = await contract.grantPermission(address);
      successToast();
      console.log('user granted access successfully', response);
    } catch (error) {
      console.error(error);
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while getting the file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w={'50%'} mx={'auto'} p={'30px'} bg={'gray.200'} as={'form'} mt={10}>
      <Stack spacing={4}>
        <Input
          placeholder="User's Address"
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setaddress(e.target.value)}
        />
      </Stack>
      <Button
        fontFamily={'heading'}
        mt={8}
        w={'full'}
        onClick={handleSubmit}
        color={'white'}
        _hover={{
          bgGradient: 'orange.500',
          boxShadow: 'xl',
        }}
        isDisabled={!address}
        bg={!address ? 'gray.400' : '#ed8936'}
        cursor={!address ? 'not-allowed' : 'pointer'}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Authorize;
