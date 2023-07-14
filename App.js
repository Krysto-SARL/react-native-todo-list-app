import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import { Header } from './components/Header/Header'
import { CardTodo } from './components/CardTodo/CardTodo'
import { s } from './App.style'
import { ScrollView } from 'react-native'
import { TabBottomMenu } from './components/TabBottomMenu/TabBottomMenu'
import { Alert } from 'react-native'
import { ButtonAdd } from './components/ButtonAdd/ButtonAdd'
import Dialog from 'react-native-dialog'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
let isFirstRender = true
let isLoadUpdate = false

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState('all')

  const [todoList, setTodoList] = useState([])
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    loadTodoList()
  }, [])

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false
    } else {
      if (!isFirstRender) {
        saveTodoList()
      } else {
        isFirstRender = false
      }
    }
  }, [todoList])

  async function saveTodoList() {
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList))
    } catch (err) {
      alert('Une erreur est survenue !' + err)
    }
  }

  async function loadTodoList() {
    try {
      const stringifiedTodoList = await AsyncStorage.getItem('@todoList')
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList)
        isLoadUpdate = true
        setTodoList(parsedTodoList)
      }
    } catch (err) {
      alert('Une erreur est survenue !' + err)
    }
  }

  function getFilteredList() {
    switch (selectedTabName) {
      case 'all':
        return todoList
      case 'inProgress':
        return todoList.filter((todo) => !todo.isCompleted)
      case 'done':
        return todoList.filter((todo) => todo.isCompleted)
    }
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    }
    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id == updatedTodo.id,
    )

    const updatedTodoList = [...todoList]
    updatedTodoList[indexToUpdate] = updatedTodo
    setTodoList(updatedTodoList)
  }

  function deleteTodo(todoToDelete) {
    Alert.alert('Suppression', 'Supprimer cette tâche ?', [
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id))
        },
      },
      {
        text: 'Annuler',
        style: 'cancel',
      },
    ])
  }

  function showAddDialog() {
    setIsDialogVisible(true)
  }
  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    }
    setTodoList([...todoList, newTodo])
    setIsDialogVisible(false)
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ButtonAdd onPress={showAddDialog} />
            <ScrollView>
              {getFilteredList().map((todo) => (
                <View style={s.cardItem} key={todo.id}>
                  <CardTodo
                    onLongPress={deleteTodo}
                    onPress={updateTodo}
                    todo={todo}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View>
        <TabBottomMenu
          onPress={setSelectedTabName}
          todoList={todoList}
          selectedTabName={selectedTabName}
        />
      </View>

      <Dialog.Container
        visible={isDialogVisible}
        onBackdropPress={() => setIsDialogVisible(false)}
      >
        <Dialog.Title>Créer un nouvelle tâche</Dialog.Title>
        <Dialog.Description>
          Choisir un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button
          disabled={inputValue.trim().length == ''}
          label="Créer"
          onPress={addTodo}
        />
      </Dialog.Container>
    </>
  )
}
