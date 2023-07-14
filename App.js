import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import { Header } from './components/Header/Header'
import { CardTodo } from './components/CardTodo/CardTodo'
import { s } from './App.style'
import { ScrollView } from 'react-native'
import { TabBottomMenu } from './components/TabBottomMenu/TabBottomMenu'
import { Alert } from 'react-native'

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState('all')

  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Sortir Askanounette', isCompleted: false },
    { id: 2, title: 'Caliner Maillou', isCompleted: false },
    { id: 3, title: 'Caliner Guccu', isCompleted: false },
    { id: 4, title: 'Faire les courses', isCompleted: true },
    { id: 5, title: 'Aller chez billys', isCompleted: false },
    { id: 6, title: 'Apprendre React Native', isCompleted: false },
    { id: 7, title: 'Boire un café', isCompleted: true },
    { id: 8, title: 'Arreter de fumer', isCompleted: false },
  ])

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
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
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
    </>
  )
}
