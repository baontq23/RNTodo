import { Box, HStack, Badge, Text, Progress, useColorModeValue, Spacer, Icon, IconButton, Spinner } from 'native-base'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

interface Props {
  totalValue: number
  onClickRefresh?: () => void
  loading?:boolean
}

const TaskReviews = ({ totalValue, onClickRefresh, loading }: Props) => {
  return (
    <Box alignItems="center" p={3}>
      <Box
        w="full"
        rounded="8"
        overflow="hidden"
        shadow="3"
        bg={useColorModeValue('coolGray.100', 'blue.500')}
        p="5"
      >
        <Box>
          <HStack alignItems="center">
            <Badge
              colorScheme="darkBlue"
              _text={{
                color: 'white'
              }}
              variant="solid"
              rounded="4"
            >
              Tasks
            </Badge>
            <Spacer />
            <IconButton onPress={onClickRefresh} icon={ loading ? <Spinner color={useColorModeValue('indigo.500', 'white')} /> : <Icon as={Feather} name='refresh-ccw' size={5} color={useColorModeValue('black', 'white')} />} borderRadius='full' size={8} />
          </HStack>
          <Text color={useColorModeValue("coolGray.800", "white")} mt="3" fontWeight="medium" fontSize="xl">
            Overviews
          </Text>
          <Text mt="2" fontSize="sm" color={useColorModeValue("coolGray.700", "white")}>
            You have completed {isNaN(totalValue) ? 0 : totalValue}% of the task
          </Text>
          <Progress value={totalValue} mt={2} colorScheme={totalValue < 50 ? 'warning' : 'success'} />
        </Box>
      </Box>
    </Box>
  )
}

export default TaskReviews
