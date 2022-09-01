import React, { useCallback, useState } from 'react'
import { Icon, VStack, useColorModeValue, Fab, StatusBar } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import TaskReviews from '../components/task-reviews'
import AppBar from '../components/app-bar'
import { useDrawerStatus } from '@react-navigation/drawer'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Item 1',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Item 2',
    done: false
  }
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback((item: any) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
  const taskDoneCount = data.filter(item => {
    return item.done
  })
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])
  const handleFinishEditingTaskItem = useCallback((_item: any) => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = useCallback((item: any) => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback((item: any) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      {useDrawerStatus() === 'closed' && <StatusBar barStyle="light-content" />}
      <VStack h={300} bg="blue.900" p={1}>
        <AppBar title='Home' />
        <TaskReviews
          totalValue={Math.round((taskDoneCount.length / data.length) * 100)}
        />
      </VStack>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
