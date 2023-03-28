import React from 'react';
import { Flex } from '@chakra-ui/react';

import Hero from '../components/Hero';
import Header from '../components/Header';

export default function Home() {
  return (
    <Flex direction={'column'}>
      <Header />
      <Hero />
    </Flex>
  );
}
