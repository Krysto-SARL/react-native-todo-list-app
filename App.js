import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { s } from './App.style'
import { Text } from 'react-native'
import { View } from 'react-native'
import { Header } from './components/Header/Header'
import { CardTodo } from './components/CardTodo/CardTodo'

const TODO_LIST = [
  { id: 1, title: 'Sortir Askanounette', isCompleted: true },
  { id: 2, title: 'Caliner Maillou', isCompleted: false },
  { id: 3, title: 'Caliner Guccu', isCompleted: false },
  { id: 4, title: 'Faire les courses', isCompleted: true },
]
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <CardTodo todo={TODO_LIST[0]} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  )
}
