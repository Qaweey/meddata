import React, { useState } from 'react';
import { Box, Stack, Button, Input, useToast } from '@chakra-ui/react';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

const auth =
  'Basic ' +
  Buffer(
    process.env.REACT_APP_INFURA_PROJECT_ID +
      ':' +
      process.env.REACT_APP_INFURA_SECRET_KEY
  ).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const Uploads = ({ contract }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);

  const handleFileSelect = e => {
    setFile(e.target.files[0]);
  };

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'File Uploaded.',
      description: 'File has been uploaded successfully',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const handleSubmit = async () => {
    try {
      const created = await client.add(file);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      await contract.addPatientRecord(fileName, metadataURI);
      successToast();

      setFile(null);
      setFileName('');
    } catch (error) {
      console.error(error);
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file.',
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
          placeholder="Name of file"
          value={fileName}
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setFileName(e.target.value)}
        />
        <Input type="file" color={'gray.800'} onChange={handleFileSelect} />
        <img
          src={
            file ? URL.createObjectURL(new Blob([file])) : undefined // Use undefined instead of null
          }
          alt="doc."
          style={{ height: '100px', width: '100px' }}
        />
      </Stack>
      <Button
        fontFamily={'heading'}
        mt={8}
        w={'full'}
        onClick={handleSubmit}
        color={'white'}
        _hover={{
          bg: 'orange.500',
          boxShadow: 'xl',
        }}
        isDisabled={!fileName}
        bg={!fileName ? 'gray.400' : '#ed8936'}
        cursor={!fileName ? 'not-allowed' : 'pointer'}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Uploads;
