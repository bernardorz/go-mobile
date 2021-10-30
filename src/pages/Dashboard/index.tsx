import React from 'react';
import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../hooks/Auth';



const Dashboard : React.FC = () => {

    const { signOut } = useAuth()


    return (
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}> 
    
                <Button title="Sair" onPress={() => {
                    console.log("Oi")
                }} />
    
        </View>
    )
}


export default Dashboard