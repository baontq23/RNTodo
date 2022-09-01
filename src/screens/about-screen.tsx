import React from 'react';
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  Image,
  useColorModeValue,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';
import Masthead from '../components/masthead';
import LinkButton from '../components/link-button';

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full">
      <Masthead
        title="About this app"
        image={require('../assets/about-masthead.jpg')}>
        <Navbar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <VStack flex={1} space={4} pb={10}>
          <Box alignItems="center">
            <Image
              source={require('../assets/baontq.jpg')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            React To do app
          </Text>
          <LinkButton
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.youtube.com/easylabpoly"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }>
            Go to YouTube channel
          </LinkButton>
          <LinkButton
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            borderRadius="full"
            href="fb://profile/100014148977286"
            href2="https://fb.com/trieubaoit"
            _text={{color: '#fff'}}
            leftIcon={
              <Icon as={Feather} name="facebook" size="sm" opacity={0.5} />
            }>
            Facebook
          </LinkButton>
          <Text fontSize="md" w="full">
            myDash - APIServer Mobile App
          </Text>
          <LinkButton
            colorScheme="purple"
            size="lg"
            borderRadius="full"
            _text={{color: '#fff'}}
            href="https://mydash.baontq.dev/"
            leftIcon={
              <Icon as={Feather} name="external-link" size="sm" opacity={0.5} />
            }>
            myDash
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  );
};

export default AboutScreen;
