import { useDrawerStatus } from '@react-navigation/drawer'
import { StatusBar, useColorModeValue, VStack } from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import AppBar from '../components/app-bar'

const SettingScreen = () => {
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
      </VStack>
    </AnimatedColorBox>
  )
}

export default SettingScreen
