/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Timeline from '../LoggedIn/Timeline';
import SignUp from './SignUp';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  Button,
  StatusBar,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {email, password} = this.state;
    event.preventDefault();
    axios
      .post('http://192.168.62.1:5000/login', {email, password})
      .then((name) => {
        console.log(name.data);
        if (name.data === 'user does not exist') {
          this.setState({error: 'User Does not Exist'});
        } else if (name.data === 'Password incorrect') {
          this.setState({error: 'Password Incorrect'});
        } else if (name.data === 'Please Enter the mail id') {
          this.setState({error: 'Please Enter the Email'});
        } else if (name.data === 'Please Enter the Password') {
          this.setState({error: 'Please Enter the Password'});
        } else {
          this.props.navigation.navigate('Timeline');
        }
      })
      .catch(() => {
        console.log('Oops, request failed!');
      });
  }

  render() {
    return (
      <>
        <ScrollView>
          <View>
            <View style={{marginTop: 50, marginLeft: 130}}>
              <Image source={require('../Images/logo.png')} />
            </View>
            <View style={styles.container}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'orange',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginBottom: 8,
                }}>
                Welcome To PPL
              </Text>
              <Text style={styles.texts}>Email</Text>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}></TextInput>

              <Text style={styles.texts}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}></TextInput>
              <Text> </Text>
              <Button
                style={styles.butt}
                title="Login"
                color="orange"
                onPress={this.handleSubmit}
                autoCapitalize="none"
              />
              <Text style={{color: 'red'}}>{this.state.error}</Text>
              <Text style={{padding: 10}}>
                Already have an account ?<Text> </Text>
                <Text
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  style={{color: 'orange', marginLeft: 20, padding: 30}}>
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 90,
  },
  butt: {
    padding: 10,
  },
  texts: {
    marginTop: 10,
    marginLeft: 5,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    //  backgroundColor:"black"
  },
});

export default Login;
