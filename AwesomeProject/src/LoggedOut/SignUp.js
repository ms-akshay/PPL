/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import axios from 'axios';
import Timeline from '../LoggedIn/Timeline';
import Login from './Login';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {username, password, email, first_name, last_name} = this.state;

    axios
      .post('http://192.168.62.1:5000/signup', {
        username,
        email,
        password,
        first_name,
        last_name,
      })
      .then((name) => {
        // console.log(name);
        if (name.data === 'user already exist') {
          console.log(name.data);
          this.setState({
            error: 'This email Already exist',
          });
        } else if (name.data === 'Please Enter All the Fields') {
          this.setState({
            error: 'Please Enter All the Fields',
          });
        } else if (name.data === 'User Added') {
          this.props.navigation.navigate('Timeline');
          console.log('Post successful!');
        }
      })
      .catch((error) => {
        console.log('Oops, request failed!', error, error.message);
        // this.errorHand();
      });
  }

  render() {
    return (
      <>
        <ScrollView>
          <View>
            <View style={{marginTop: 22, marginLeft: 130}}>
              <Image source={require('../Images/logo.png')} />
            </View>
            <View style={styles.container}>
              <Text style={styles.texts}>UserName</Text>
              <TextInput
                placeholder="UserName"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}></TextInput>
              <Text style={styles.texts}>Email</Text>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}></TextInput>
              <Text style={styles.texts}>First Name</Text>
              <TextInput
                placeholder="First Name"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(first_name) => this.setState({first_name})}
                value={this.state.first_name}></TextInput>
              <Text style={styles.texts}>Last Name</Text>
              <TextInput
                placeholder="Last Name"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(last_name) => this.setState({last_name})}
                value={this.state.last_name}></TextInput>
              <Text style={styles.texts}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}></TextInput>
              <Text></Text>
              <Button
                style={styles.butt}
                title="Sign Up"
                color="orange"
                onPress={this.handleSubmit}
              />
              <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  texts: {
    marginTop: 8,
    marginLeft: 5,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    //  backgroundColor:"black"
  },
});

export default SignUp;
