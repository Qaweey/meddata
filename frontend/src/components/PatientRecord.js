import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Input,
  useToast,
  Heading,
  Grid,
  GridItem,
  Card,
  CardBody,
  Image,
} from '@chakra-ui/react';

const RecordCard = ({ name, imageSrc }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageSrc, setFullscreenImageSrc] = useState('');

  const handleImageClick = src => {
    setIsFullscreen(true);
    setFullscreenImageSrc(src);
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(false);
    setFullscreenImageSrc('');
  };

  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            style={{ cursor: 'pointer', backgroundSize: 'cover' }}
            src={imageSrc}
            alt={name}
            borderRadius="lg"
            onClick={() => handleImageClick(imageSrc)}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
          </Stack>
        </CardBody>
      </Card>
      {isFullscreen && (
        <Box
          position="fixed"
          zIndex={9999}
          top={0}
          left={0}
          width="80%"
          height="80%"
          backgroundColor="#fff"
          onClick={handleFullscreenClick}
        >
          <Image src={fullscreenImageSrc} maxW="100%" maxH="100%" m="auto" />
        </Box>
      )}
    </>
  );
};

const RecordGrid = ({ data }) => {
  return (
    <Box w="80%" mx="auto" p="30px" bg="gray.200" mt={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
        {data?.map((dat, index) => {
          return (
            <GridItem key={Math.floor(Math.random() * 1000)}>
              <RecordCard
                key={`record-${Math.floor(Math.random() * 1000)}`}
                name={dat[0]}
                imageSrc={dat[1]}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

const PatientRecord = ({ contract }) => {
  const [address, setaddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [doc, setDoc] = useState([]);

  const toast = useToast();
  const successToast = () =>
    toast({
      title: "User's Record fetched.",
      description: "User's records have been fetched successfully",
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await contract.getPatientMedicalRecord(address);
      successToast();
      console.log('user granted access successfully', response);
      setDoc(response);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w={'80%'} mx={'auto'} p={'30px'} bg={'gray.200'} as={'form'} mt={10}>
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
          bg: 'orange.500',
          boxShadow: 'xl',
        }}
        isDisabled={!address}
        bg={!address ? 'gray.400' : '#ed8936'}
        cursor={!address ? 'not-allowed' : 'pointer'}
      >
        Confirm
      </Button>
      {isLoading ? (
        <Box w="80%" mx="auto" p="30px" bg="gray.200" mt={10}>
          <Heading color={'orange.400'} size="md">
            Loading...
          </Heading>
        </Box>
      ) : doc.length === 0 ? (
        <Box w="80%" mx="auto" p="30px" bg="gray.200" mt={10}>
          <Heading color={'orange.400'} size="md">
            Record is empty
          </Heading>
        </Box>
      ) : (
        <RecordGrid data={doc} />
      )}
    </Box>
  );
};

export default PatientRecord;
