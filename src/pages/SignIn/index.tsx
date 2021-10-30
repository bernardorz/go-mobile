import React, { useCallback, useEffect, useRef } from 'react';
import { Image, View, ScrollView ,KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useAuth } from '../../hooks/Auth'
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'
import logoImg from '../../assets/logo.png';
import  Input from '../../components/Input'
import  Button from '../../components/Button'
import getValidationError from '../../utils/getValidationErrors';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

interface SignInFormData {
    email : string;
    password : string;
}

const SignIn : React.FC  = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputReef = useRef<TextInput>(null)
    const navigation = useNavigation();

    const { signIn } = useAuth()

  
    const handleSignIn = useCallback(
      async (data : SignInFormData) => {
        try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().required('Senha obrigatoria'),
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });
    
          await signIn({
            email: data.email,
            password: data.password,
          });
        
        //   history.push('/dashboard');
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationError(err);
            formRef.current?.setErrors(errors);
            return;
          }
    
        //   addToast({
        //     type: 'error',
        //     title: 'Erro na autenticação',
        //     description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        //   });
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais')

        }
      }, [signIn]);
    

    return (
        <>
        <KeyboardAvoidingView 
         style = { { flex : 1}}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         enabled
        >
        <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex : 1}}
        >
        <Container> 
            <Image  source={logoImg} />

            <View>
            <Title> Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
            name="email" 
            icon="mail"  
            placeholder="email"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {}}
            />
            <Input 
            ref={passwordInputReef}
            name="password" 
            icon="lock" 
            placeholder="senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => {
                formRef.current?.submitForm();
            }}
            />   
           
            <Button onPress={() => {
                formRef.current?.submitForm();
            }} >Entrar</Button>
            </Form>

            <ForgotPassword>

                <ForgotPasswordText>
                    Esqueci minha senha
                </ForgotPasswordText>

            </ForgotPassword>
        

         </Container>
         </ScrollView>
         </KeyboardAvoidingView>

        <CreateAccountButton onPress={() => 
            navigation.navigate('SignUp')
        }>

            <Icon name="log-in" size={20} color="#ff9000"  />

            <CreateAccountButtonText>
                Criar conta
            </CreateAccountButtonText>

        </CreateAccountButton>
   
        </>
    )
}

export default SignIn;