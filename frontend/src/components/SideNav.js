import React, { useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiEye,
  FiServer,
  FiUploadCloud,
  FiCodesandbox,
  FiFileText,
  FiMenu,
} from 'react-icons/fi';

import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/patient.sol/patientInfo.json';

import View from './View';
import Authorize from './Authorize';
import Uploads from './Uploads';
import Register from './Register';
import PatientRecord from './PatientRecord';

const record = (
  <p>
    Get Patient's <br /> record
  </p>
);

const LinkItems = [
  { name: 'Register User', icon: FiServer, to: 'register' },
  { name: 'Upload Record', icon: FiUploadCloud, to: 'uploads' },
  { name: 'View Records', icon: FiEye, to: 'view' },
  { name: 'Authorize User', icon: FiCodesandbox, to: 'authorize' },
  { name: record, icon: FiFileText, to: 'patientRecord' },
];

export default function SimpleSidebar({ children }) {
  const [toDisplay, setToDisplay] = useState('register');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const CONTRACT_ADDRESS = '0xd1d3FbDdBA666C77e99E83a2c873c23429aF296E';

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider, // use signer if available, else use provider
  });

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        setToDisplay={setToDisplay}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
        {toDisplay === 'register' ? (
          <Register contract={contract} />
        ) : toDisplay === 'view' ? (
          <View contract={contract} />
        ) : toDisplay === 'uploads' ? (
          <Uploads contract={contract} />
        ) : toDisplay === 'authorize' ? (
          <Authorize contract={contract} />
        ) : (
          <PatientRecord contract={contract} />
        )}
      </Flex>
    </Box>
  );
}

const SidebarContent = ({ onClose, setToDisplay, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            back
          </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          setToDisplay={setToDisplay}
          to={link.to}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ to, icon, children, setToDisplay, ...rest }) => {
  return (
    <Flex
      align="center"
      onClick={() => setToDisplay(to)}
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      fontWeight="600"
      cursor="pointer"
      _hover={{
        bg: '#ed8936',
        color: 'black',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="24"
          color="#ed8936"
          _groupHover={{
            color: 'black',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
    // </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
