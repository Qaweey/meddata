import React, { useState } from 'react';
import { Box, Stack, Button, Input, useToast } from '@chakra-ui/react';

const Register = ({ contract }) => {
  const [name, setName] = useState('');

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'User registered.',
      description: 'User have been registered successfully',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const handleSubmit = async () => {
    try {
      await contract.registerPatient(name);
      successToast();
      setName('');
      console.log('user added', name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box w={'50%'} mx={'auto'} p={'30px'} bg={'gray.200'} as={'form'} mt={10}>
      <Stack spacing={4}>
        <Input
          placeholder="Name"
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setName(e.target.value)}
        />
      </Stack>
      <Button
        fontFamily={'heading'}
        mt={8}
        w={'full'}
        onClick={handleSubmit}
        color={'white'}
        _hover={{
          bg: '0range.400',
          boxShadow: 'xl',
        }}
        isDisabled={!name}
        bg={!name ? 'gray.400' : '#ed8936'}
        cursor={!name ? 'not-allowed' : 'pointer'}
      >
        Register User
      </Button>
    </Box>
  );
};

export default Register;
