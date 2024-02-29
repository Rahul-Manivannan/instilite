import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image // Import Image component
} from 'react-native';

import axios from 'axios';
const App = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  
 

  const onPressLogin = () => {
    const credentials ={
      user_id: state.email,
      user_password: state.password
    };
    
    
    axios.post('http://10.42.65.200:3000/login', credentials,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
      // Handle successful response
      console.log(response.data);
      })
      .catch(error => {
      // Handle error
      console.error(error);
  });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{uri : 'https://s3-alpha-sig.figma.com/img/bb35/1a0d/70ccf56eeabc718375f7898daf3890b9?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f8SOj983C6uPlCuqxcWv2xAk7jLcrrJwogU~mxee9XxfYfOlaFoMs1ZdWtD52eik3ObmDpajZNi5XEJxu4DP0P2oIv6iFA4HQzRv29caaYkWVCDB6kjH1DXVATSwb-AkxTEFwQd2FpR6lrp-ttapj9lwriN86lrrqP-PI0m6xA4gSAiVUwuULYqIwt9-i6ayYSvZuQyywfGY7thm9n3TSKLUcmruK7-07pFOz1XVnyd3oznjsxCr0l826NkHFOQEskSiNk1gD-irbuArvGvzJF1tDCx~BJRp8X1gU7Gjq8oHHV6Q9TlwyWFT-PzeBpaMWQF2J1YokIRkmPsDVEwiRg__'}} />
      <Text style={styles.name}>INSTILITE</Text>
      <Text style={styles.tagline}>Insti happening all at once</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#000000"
          onChangeText={text => setState({ ...state, email: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#000000"
          onChangeText={text => setState({ ...state, password: text })}
        />
      </View>
      {/* <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={onPressSignUp}>
        <Text style={styles.forgotAndSignUpText}>Signup</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7B28E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#000000',
    marginBottom: 40,
  },
  tagline: {
    fontSize: 26,
    color: '#000000',
    marginBottom: 50,
    flexShrink: 1,
    fontFamily: 'Georgia-BoldItalic'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#FCF9E5',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#B09677',
  },
  forgotAndSignUpText: {
    color: '#B09677',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#606D56',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
export default Loginui;

