import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { s } from './CardTodo.style';
import checkImg from '../../assets/check.png';

export function CardTodo({ todo , onPress , onLongPress}) {
  return (
    <TouchableOpacity onLongPress={() => onLongPress(todo)} onPress={() => onPress(todo)} style={s.card}>
      <Text style={[s.text, todo.isCompleted && { textDecorationLine: "line-through" }]}>
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.img} source={checkImg} />}
    </TouchableOpacity>
  );
}