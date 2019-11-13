import React, { useRef } from 'react';
import { Image } from 'react-native';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function Signin({ navigation }) {
  const passwordRef = useRef();

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Your password"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={handleSubmit}>Enter</SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('Signup')}>
          <SignLinkText>Create free account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
