import React, { useState } from "react";
import { View,ScrollView, Button, StyleSheet,TextInput } from "react-native";
import firebase from "../database/database";

//props no ayuda a redirigir a otra pantalla
const usuarioCrear=(props)=>{
    const [state,setState]=useState({
        name:"",
        email:"",
        phone:""
    });
    
    const handleChangetext=(name,value)=>{
        setState({...state,[name]:value})
    }; 


    const crearNuevoUsuario=async ()=>{
        if(state.name==''){
            alert('Porfavor llena todos los campos')
        }else {
           try {
            await firebase.db.collection('usuario').add({
                name: state.name,
                email:state.email,
                phone:state.phone
            })
            //alert('Guardado!')
            props.navigation.navigate('usuariosLista')
           } catch (error) {
               console.log(error)
           }
        }
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
               <TextInput 
               placeholder="Nombre" 
               onChangeText={(value)=>handleChangetext('name',value)}/>
            </View>
            <View style={styles.inputGroup}>
               <TextInput 
               placeholder="Correo" 
               onChangeText={(value)=> handleChangetext('email',value)}/>
            </View>
            <View>
               <TextInput 
               placeholder="Celular" 
               onChangeText={(value)=> handleChangetext('phone',value)}/>
            </View>
            <View style={styles.inputGroup}>
               <Button title="Guardar" onPress={ ()=> crearNuevoUsuario()}/>
            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
    flex:1,
    padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:"#cccccc"
    }
})

export default  usuarioCrear