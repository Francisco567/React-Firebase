import React, { useEffect,useState } from "react";
import { View,ScrollView, Button, StyleSheet,TextInput, ActivityIndicator, Alert } from "react-native";
import firebase from "../database/database";

const usuarioDetalle=(props)=>{
    
    //console.log(props.route.params.usuarioId)
    const initialState={
        id:"",
        name:"",
        email:"",
        phone:""
    }
    // #2 Se guardan aca
    const [usuario,setUsuario]=useState(initialState)
    //#5 un loading para que envie los datos
    const [loading,setLoading]=useState(true)

    //#1 Recibe los datos Aqui
    const getUsuarioById=async (id)=>{
        const dbRef =firebase.db.collection('usuario').doc(id)
        const doc=await dbRef.get();
        const usuario= doc.data();
        //console.log(usuario)
        setUsuario({
            ...usuario,
            id:doc.id,
        });
        setLoading(false)
    }
    //#0 recibe el id aca
    useEffect(()=>{
         getUsuarioById(props.route.params.usuarioId)
    },[]);
    //#4 Guarda los datos aqui
    const handleChangetext=(name,value)=>{
        setUsuario({...usuario,[name]:value})
    }; 
    
    //Funcion para eliminar
    const eliminarUsuario=async ()=>{
        const dbRef=firebase.db.collection('usuario').doc(props.route.params.usuarioId);
        await dbRef.delete();
        props.navigation.navigate('usuariosLista')
    }
    
    const actualziarUsuario=async ()=>{
        const dbRef= firebase.db.collection('usuario').doc(usuario.id);
        await dbRef.set({
            name: usuario.name,
            email:usuario.email,
            phone:usuario.phone
        })
        setUsuario(initialState)
        props.navigation.navigate('usuariosLista')
    }
    //Alert de confirmacion para eliminar (es un componente nativo asi que solo se vera en el celular)
    const alertEliminar=()=>{
        Alert.alert('Eliminar usuario','Estas seguro de eliminar este usuario?',[
            {text:'yes',onPress:()=> eliminarUsuario()},
            {text:'No',onPress:()=> console.log('false')}
        ]);
    };

   //Loading de carga  
   if(loading){
       return(
           <View>
               <ActivityIndicator size="large" color="#9e9e9e"/>
           </View>
       );
   }


    //#3 se muestran aqui
    return(
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
           <TextInput 
           placeholder="Nombre" 
           value={usuario.name}
           onChangeText={(value)=>handleChangetext('name',value)}/>
        </View>
        <View style={styles.inputGroup}>
           <TextInput 
           placeholder="Correo" 
           value={usuario.email}
           onChangeText={(value)=> handleChangetext('email',value)}/>
        </View>
        <View style={styles.inputGroup}>
           <TextInput 
           placeholder="Celular"
           value={usuario.phone} 
           onChangeText={(value)=> handleChangetext('phone',value)}/>
        </View>
        <View style={styles.inputGroup}>
           <Button color='#E37399' title="Actualizar" onPress={ ()=>actualziarUsuario()}/>
        </View>
        <View style={styles.inputGroup}>
           <Button title="Eliminar" onPress={ ()=>alertEliminar()}/>
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
export default  usuarioDetalle