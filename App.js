import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { s } from './App.style'
import { Text } from 'react-native'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text style={s.text}>HELLO</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
