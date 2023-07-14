
import { View, Image, Text } from 'react-native';
import { s } from './Header.style';
import headerLogo from '../../assets/logo.png'

export function Header() {
  return (
    <>
      <Image source={headerLogo} style={s.image} />
      <Text style={s.subtitle}>Tu as probablement quelque chose à faire !</Text>
    </>
  );
}
