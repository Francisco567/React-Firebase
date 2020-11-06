import { useLinkProps } from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import { View,Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/database";
import { ListItem,Avatar } from "react-native-elements";

//Crea el props aqui para usarlo y navegar a otras pantallas
const usuarioLista=(props)=>{
    const [usuarios,setUsuarios]=useState([])

    //Cargar datos de firebase por consola
    useEffect(()=>{
       firebase.db.collection('usuario').onSnapshot(querySnapshot=>{
        const usuarios=[];

           querySnapshot.docs.forEach((doc)=>{
               //console.log(doc.data());
               const {name,email,phone}=doc.data()
               usuarios.push({
                   id:doc.id,
                   name,
                   email,
                   phone
               })
           });
           console.log(usuarios)
      setUsuarios(usuarios)
       });
    }, []);

    return(
       <ScrollView>
           <Button title="crear usuario" onPress={()=>props.navigation.navigate('usuarioCrear')}/>

           {usuarios.map((usuario)=>{
                   return(
                       <ListItem key={usuario.id} bottomDivider onPress={()=>{
                           props.navigation.navigate('usuarioDetalle',{
                               usuarioId:usuario.id
                           })
                       }}>
                           <ListItem.Chevron/>
                           <Avatar
                           source={{
                               uri:'https://reactnativeelements.com/img/avatar/avatar--photo.jpg'
                           }}
                           rounded
                           />
                           <ListItem.Content>
                               <ListItem.Title>{ usuario.name }</ListItem.Title>
                               <ListItem.Subtitle>{usuario.email}</ListItem.Subtitle>
                           </ListItem.Content>
                       </ListItem>
                   );
               })
           }
       </ScrollView>
    )
}

export default  usuarioLista