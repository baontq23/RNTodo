import { useDrawerStatus } from '@react-navigation/drawer'
import { StatusBar, useColorModeValue, VStack, ScrollView, HStack, Text, Switch, useColorMode } from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import AppBar from '../components/app-bar'

const SettingScreen = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      {useDrawerStatus() === 'closed' && (
        <StatusBar
          barStyle={useColorModeValue('dark-content', 'light-content')}
        />
      )}
      <VStack>
        <AppBar title="Setting" useColorMode />
        <ScrollView w='full' mt={3}>
          <HStack p={2} bg={useColorModeValue('primary.100', 'blue.600')} borderRadius={5} mx={2} justifyContent='space-between' alignItems='center'>
            <Text fontSize={16} bold>Dark mode</Text>
            <Switch colorScheme='success' isChecked={colorMode === 'dark'} onToggle={toggleColorMode} />
          </HStack>
        </ScrollView>
      </VStack>
    </AnimatedColorBox>
  )
}

export default SettingScreen
