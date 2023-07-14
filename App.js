import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import { Header } from './components/Header/Header'
import { CardTodo } from './components/CardTodo/CardTodo'
import { s } from './App.style'
import { ScrollView } from 'react-native'

export default function App() {
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
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>
              {todoList.map((todo) => (
                <View style={s.cardItem} key={todo.id}>
                  <CardTodo todo={todo} />
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  )
}
