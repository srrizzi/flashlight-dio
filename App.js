import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity,} from 'react-native';
import skullW from './assets/icons/skull_white.png';
import skullB from './assets/icons/skull_black.png';
import Torch from "react-native-torch";
import RNShake from 'react-native-shake'

const App = () =>
{
const [toggle, setToggle] = useState(false);

//Função para trocar as Telas do Celular Black/White
const handleToggle = () => setToggle(oldToggle => !oldToggle);

useEffect(()=>{
  //Liga a Lanterna do Celular
  Torch.switchState(toggle);
}, [toggle])

useEffect(()=>{
  //Sacudir o Celular para ativar
  const subscription = RNShake.addListener(()=>{
    handleToggle()
  });
  // Essa função vai ser chamada quando o Componete for ser desmontado
  return () => subscription.remove();
}, [toggle])

  return (
  <View style={toggle ? style.containerWhite : style.containerBlack} >
    <TouchableOpacity onPress={handleToggle}>
      <Image 
        style={toggle ? style.lightingOn : style.lightingOff}
        source={toggle ? skullB : skullW} 
      />
    </TouchableOpacity>
  </View>
  )
}

export default App

const style = StyleSheet.create({
  containerBlack: 
  {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerWhite: 
  {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightingOn:
  {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:
  {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
})