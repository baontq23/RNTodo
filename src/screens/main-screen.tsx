import React, { useCallback, useEffect, useState } from 'react'
import { Icon, VStack, useColorModeValue, Fab, StatusBar } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import TaskReviews from '../components/task-reviews'
import AppBar from '../components/app-bar'
import { useDrawerStatus } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Task = {
  id: string
  subject: string
  done: boolean
}

export default function MainScreen() {
  const [data, setData] = useState<Task[]>([])
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const getDataFromLocal = () => {
    setLoading(true)
    AsyncStorage.getItem('taskData').then(value => {
      const saveData = JSON.parse(value!)
      setData(saveData)
      setLoading(false);
    })
  }
  useEffect(() => {
    getDataFromLocal()
  }, [])
  const handleToggleTaskItem = useCallback((item: Task) => {
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
  const taskDoneCount = data?.filter(item => {
    return item.done
  })
  useEffect(() => {
    AsyncStorage.setItem('taskData', JSON.stringify(data)).catch(e => {
      console.log(e)
    })
  }, [editingItemId, data.length, taskDoneCount.length])

  const handleChangeTaskItemSubject = useCallback(
    (item: Task, newSubject: string) => {
      setData(prevData => {
        const newData = [...prevData]
        const index = prevData.indexOf(item)
        newData[index] = {
          ...item,
          subject: newSubject
        }
        return newData
      })
    },
    []
  )
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
        <AppBar title="Home" />
        <TaskReviews
          totalValue={
            taskDoneCount
              ? Math.round((taskDoneCount.length / data.length) * 100)
              : 0
          }
          onClickRefresh={getDataFromLocal}
          loading={loading}
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
          {
            data
              ? setData([
                {
                  id,
                  subject: '',
                  done: false
                },
                ...data
              ])
              : setData([
                {
                  id,
                  subject: '',
                  done: false
                }
              ])
          }
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
