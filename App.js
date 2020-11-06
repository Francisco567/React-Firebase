import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//El stack contiene toda neustra navegacion
const stack=  createStackNavigator()


import usuariosLista from "./screens/usuariosLista";
import usuarioCrear from "./screens/usuarioCrear";
import usuarioDetalle from "./screens/usuarioDetalle";

function MyStack() {
  return(
    <stack.Navigator>
      <stack.Screen name="usuariosLista"  component={usuariosLista} options= {{title:'Lista de Usuarios'}}/>
      <stack.Screen name="usuarioCrear"  component={usuarioCrear} options= {{title:'Usuario Detalle'}}/>
      <stack.Screen name="usuarioDetalle"  component={usuarioDetalle} options= {{title:'Crear Usuario'}}/>
    </stack.Navigator>
  );
}
export default function App() {
  return (
   <NavigationContainer>
      <MyStack/>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
