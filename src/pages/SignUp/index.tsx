import React, { useRef, useCallback } from 'react';
import { Image, View, ScrollView ,KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'
import logoImg from '../../assets/logo.png';
import  Input from '../../components/Input'
import  Button from '../../components/Button'
import { Container, Title, BackToSignIn, BackToSignInText} from './styles';
import getValidationError from '../../utils/getValidationErrors';
import { api } from '../../services/api'

interface FormType{
    nome : string;
    email : string;
    password : string;
}

const SignUp : React.FC  = () => {

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    
  const handleSignUp = useCallback(async (data : FormType) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
    //   addToast({
    //     type: 'success',
    //     title: 'Cadastro realizado',
    //     description: 'Você ja pode fazer logon',
    //   });

    Alert.alert('Cadastro realizado com sucesso', 'você pode fazer login na aplicação')
    console.log("criou ")

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        formRef.current?.setErrors(errors);
        return;
      }

    //   addToast({
    //     type: 'error',
    //     title: 'Erro no cadastro',
    //     description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
    //   });
    Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais')
}
  }, []);

    return (
        <>
        <KeyboardAvoidingView 
        style = { { flex : 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        >
        <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex : 1}}
        >
        <Container> 
            <Image  source={logoImg} />

            <View>
            <Title> Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>

            <Input name="name" icon="lock" placeholder="Nome" />   
    
            <Input 
            ref={emailInputRef}
            name="email" 
            keyboardType='email-address'
            icon="mail"  
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            />

            <Input 
            ref={passwordInputRef}
            secureTextEntry
            name="password" 
            icon="lock" 
            placeholder="Senha"
            textContentType="newPassword"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
            />   

            <Button onPress={() => {
                formRef.current?.submitForm();
            }} >Criar conta</Button>
            </Form>


         </Container>
         </ScrollView>
         </KeyboardAvoidingView>

        <BackToSignIn onPress={() =>
            navigation.goBack()
        }>

            <Icon name="arrow-left" size={20} color="#fff"  />

            <BackToSignInText>
                Voltar para login
            </BackToSignInText>

        </BackToSignIn>
        </>
    )
}

export default SignUp;