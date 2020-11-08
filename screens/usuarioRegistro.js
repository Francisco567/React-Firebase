import React,{useState} from "react";
import firebase from "../database/database";
import { View,ScrollView, Button, StyleSheet,TextInput } from "react-native";

const usuarioRegistro = () => {

    const initialState={
        email:'',
        password:'',
        nombreCompleto:''
    }
    
    const [usuarioNew,setUsuarioNew]=useState(initialState)
    
    const handleChangetext=(name,value)=>{
        setUsuarioNew({...usuarioNew,[name]:value})
    };

    
const registroEmail=async()=>{
    try {
        if (usuarioNew.password.length < 6) {
            alert('la contraseña debe tener almenos 6 caracteres')
            return;
        }else{
            await firebase.auth.createUserWithEmailAndPassword(usuarioNew.email,usuarioNew.password)
            
            //console.log(usuarioNew.email,usuarioNew.password )
            alert('Usuario registrado!')
        }
    } catch (error) {
        console.log(error.toString())
    }
}

    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
           <TextInput 
           placeholder="Correo" 
           onChangeText={(value)=> handleChangetext('email',value)}
        />
        </View>
        <View style={styles.inputGroup}>
           <TextInput 
           placeholder="Contraseña" 
           onChangeText={(value)=> handleChangetext('password',value)}
           />
        </View>
        <View style={styles.inputGroup}>
           <Button title="Guardar" onPress={()=> registroEmail()}/>
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

export default usuarioRegistro
