import {
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  Actionsheet,
  useColorModeValue,
  useToast,
  useDisclose
} from 'native-base'
import React, { useCallback } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useDrawerStatus, DrawerNavigationProp } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props {
  title: string
  useColorMode?: Boolean
}

const AppBar = ({ title, useColorMode }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const toast = useToast()
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])
  const handlePressSyncWithServerButton = useCallback(() => {
    fetch('https://api.rntodo.tk/sync.php').then(async res => {
      await AsyncStorage.setItem('taskData', await res.text())
      toast.show({
        description: 'Data sync successfully!'
      })
    }).catch(e => {
      console.log(e)
    })
    onClose()
  }, [navigation])
  const handlePressSyncWithClientButton = useCallback(async () => {
    const localData = await AsyncStorage.getItem('taskData')

    fetch('https://api.rntodo.tk/sync.php', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: localData
    })
      .then(async res => {
        toast.show({
          description: await res.text()
        })
      }).catch(e => {
        toast.show({
          description: 'Server error!'
        })
        console.log(e);
      })

    onClose()
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
            onPress={onOpen}
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
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300'
              }}
            >
              Sync system
            </Text>
          </Box>
          <Actionsheet.Item
            onPress={handlePressSyncWithServerButton}
            startIcon={<Icon as={Feather} name="server" size={6} />}
            borderRadius={10}
          >
            Sync with server
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={handlePressSyncWithClientButton}
            startIcon={<Icon as={Feather} name="smartphone" size={6} />}
            borderRadius={10}
          >
            Sync with client
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
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
            onPress={onOpen}
            borderRadius={100}
            icon={<Icon as={Feather} name="cloud" size="6" color="white" />}
          />
        </HStack>
      </HStack>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300'
              }}
            >
              Sync system
            </Text>
          </Box>
          <Actionsheet.Item
            onPress={handlePressSyncWithServerButton}
            startIcon={<Icon as={Feather} name="server" size={6} />}
            borderRadius={10}
          >
            Sync with server
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={handlePressSyncWithClientButton}
            startIcon={<Icon as={Feather} name="smartphone" size={6} />}
            borderRadius={10}
          >
            Sync with client
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default AppBar
