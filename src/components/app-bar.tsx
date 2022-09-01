import {
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useToast
} from 'native-base'
import React, { useCallback } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useDrawerStatus, DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
  title: string
  useColorMode?: Boolean
}

const AppBar = ({ title, useColorMode }: Props) => {
  const toast = useToast()
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])
  const handlePressSyncButton = useCallback(() => {
    toast.show({
      description: 'Sync data...'
    })
  }, [navigation])
  return useColorMode ? (
    <>
      <Box safeAreaTop />
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <IconButton
            borderRadius={100}
            icon={
              <Icon
                size="6"
                as={Feather}
                name={useDrawerStatus() === 'open' ? 'arrow-left' : 'menu'}
                color={useColorModeValue('black', 'white')}
              />
            }
            onPress={handlePressMenuButton}
          />
          <Text
            color={useColorModeValue('black', 'white')}
            fontSize="20"
            fontWeight="bold"
          >
            {title}
          </Text>
        </HStack>
        <HStack>
          <IconButton
            onPress={handlePressSyncButton}
            borderRadius={100}
            icon={
              <Icon
                as={Feather}
                name="cloud"
                size="6"
                color={useColorModeValue('black', 'white')}
              />
            }
          />
        </HStack>
      </HStack>
    </>
  ) : (
    <>
      <Box safeAreaTop />
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <IconButton
            borderRadius={100}
            icon={
              <Icon
                size="6"
                as={Feather}
                name={useDrawerStatus() === 'open' ? 'arrow-left' : 'menu'}
                color="white"
              />
            }
            onPress={handlePressMenuButton}
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack>
          <IconButton
              onPress={handlePressSyncButton}
            borderRadius={100}
            icon={<Icon as={Feather} name="cloud" size="6" color="white" />}
          />
        </HStack>
      </HStack>
    </>
  )
}

export default AppBar
