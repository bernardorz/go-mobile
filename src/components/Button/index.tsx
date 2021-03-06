import React, { Component} from 'react';
import  { RectButtonProperties } from 'react-native-gesture-handler'
import { Text } from 'react-native';
import { Container, ButtonText } from './styles'

interface ButtonProps extends RectButtonProperties{
    children :  string;
}

const Button : React.FC<ButtonProps> = ( { children, ...rest } ) => {
    return (
        <Container {...rest}>
            <ButtonText> 
               {children}
            </ButtonText>
        </Container>
    )
}

export default Button;