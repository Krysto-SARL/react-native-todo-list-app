
import { TouchableOpacity } from 'react-native';
import { s } from './ButtonAdd.style';
import { Text } from 'react-native';


export function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
     <Text style={s.txt}>+ Ajouter une todo</Text>
    </TouchableOpacity>
  );
}