import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { s } from './App.style'
import { Text } from 'react-native'
import { View } from 'react-native'

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Text>Header</Text>
          </View>
          <View style={s.body}>
            <Text>Body</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  )
}
