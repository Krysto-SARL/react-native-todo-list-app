import { View } from 'react-native'
import { s } from './TabBottomMenu.style'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'

export function TabBottomMenu({ selectedTabName, onPress , todoList }) {
 
  const countByStatus = todoList.reduce((acc, todo) => {
    todo.isCompleted ? acc.done++ : acc.inProgress++
    return acc
  }, {all: todoList.length, inProgress: 0 , done: 0 })


  

  function getTextStyle(tabName) {
    return {
      fontWeight: 'bold',
      color: tabName === selectedTabName ? '#2F76E5' : 'black',
    }
  }
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => onPress('all')}>
        <Text style={getTextStyle('all')}>Tous ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('inProgress')}>
        <Text style={getTextStyle('inProgress')}>En cours ({countByStatus.inProgress})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('done')}>
        <Text style={getTextStyle('done')}>Fait ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  )
}
