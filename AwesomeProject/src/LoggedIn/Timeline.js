import React from 'react';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Form from '../../Form';
import DocumentPicker from 'react-native-document-picker';
import SignUp from '../LoggedOut/SignUp';
import Login from '../LoggedOut/Login';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  Modal,
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

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      singleFile: null,
      uri: null,
      image: null,
      imagesArray: [],
      user: '',
    };
  }
  DocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res.data.file is --->>>', res);
      this.setState({
        singleFile: res,
      });
      this.setState({
        uri: res.uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  Upload = () => {
    if (this.state.singleFile != null) {
      const fileToUpload = this.state.singleFile;
      const data = new FormData();
      // console.log('Data ====', fileToUpload);
      //  data.append('name', 'avatar');
      data.append('fileData', {
        uri: fileToUpload.uri,
        type: fileToUpload.type,
        name: fileToUpload.name,
      });
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };
      fetch('http://10.0.3.2:5000/upload', config)
        .then((response) => response.json())
        .then((result) => {
          this.setState({image: result});
          // this.setState({imagesArray: result});
          this.setState({
            imagesArray: this.state.imagesArray.concat(this.state.image),
          });

          console.log(this.state.imagesArray);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    // await axios
    //   .post('http://10.0.0.2:5000/upload', data)
    //   .then((result) => {
    //     console.log('File Uploaded');
    //   })
    //   .catch((error) => {
    //     console.log('Error is --->>>>>', error, error.message);
    //   });
    else {
      alert('Please Select File first');
    }
  };

  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.nav}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}></View>
          </View>
          <View style={styles.container}>
            <View>
              <Image
                source={require('../Images/timeline_img1.png')}
                style={{
                  height: 175,
                  marginLeft: 12,
                  marginTop: 4,
                  width: 140,
                  marginLeft: 6,
                }}
              />
            </View>
            <View style={styles.info}>
              <Text>Name:</Text>
              <Text style={{fontWeight: 'bold'}}>Stefiney Gibbs</Text>
              <Text>Sex:</Text>
              <Text style={{fontWeight: 'bold'}}>Female</Text>
              <Text>Description</Text>
              <Text style={{fontWeight: '100'}}>
                This is an example of a comment. You can create as many comments
                like this one.
              </Text>
            </View>
          </View>

          <View style={styles.butt}>
            <Button
              title="Upload Post"
              color="orange"
              onPress={() => this.setState({isVisible: !this.state.isVisible})}
            />
            <Button title="Invite Friends" color="orange" />
          </View>
          <View>
            {/* <Text>{this.state.imagesArray}</Text> */}

            {this.state.imagesArray.map((image) => {
              return (
                <View>
                  <View
                    style={{
                      borderBottomColor: 'orange',
                      borderBottomWidth: 1,
                      marginTop: 15,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'orange',
                        fontWeight: '800',
                        fontSize: 15,
                      }}>
                      User Interface PSD Source files Web Designing for web
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Image source={require('../Images/img_6.png')} />
                      <Text style={{marginTop: 7}}>Steave Waugh</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          marginTop: 7,
                        }}>{`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</Text>
                      <Text style={{marginLeft: 11, marginTop: 7}}>
                        {`${new Date().getHours()}:${new Date().getMinutes()}`}
                      </Text>
                    </View>
                  </View>
                  {/* <Text>{`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</Text>
                  <Text>{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</Text> */}

                  <Image
                    key={image}
                    source={{
                      uri: `http://10.0.3.2:5000/${image}`,
                    }}
                    style={{
                      // height: 250,
                      // width: 365,
                      width: 362,
                      height: 200,
                      marginTop: 4,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View style={{width: '15%'}}>
                      <Button title="Flag " color="orange" />
                    </View>
                    <View style={{width: '17%'}}>
                      <Button title="Share " color="orange" />
                    </View>
                    <View style={{width: '16%'}}>
                      <Button title="Likes " color="orange" />
                    </View>
                    <View style={{width: '27%'}}>
                      <Button title="Comments " color="orange" />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          {this.state.isVisible && (
            <View style={styles.containers}>
              <Modal
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}>
                <View style={styles.modal}>
                  <Text style={styles.text}>Form</Text>
                  <Button
                    title="Click To Close Modal"
                    onPress={() => {
                      this.setState({isVisible: !this.state.isVisible});
                    }}
                  />
                  <View style={{padding: 12}}>
                    <Button title="Select File" onPress={this.DocumentPick} />
                  </View>
                  <View style={{padding: 12}}>
                    <Button title="Upload File" onPress={this.Upload} />
                  </View>
                </View>
              </Modal>
            </View>
          )}

          <View>
            <View style={styles.post}>
              <View>
                <Text
                  style={{color: 'orange', fontWeight: '900', fontSize: 15}}>
                  User Interface PSD Source files Web Designing for web
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Image source={require('../Images/img_6.png')} />
                  <Text style={{marginTop: 7}}>Steave Waugh</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{marginTop: 7}}>11 March 2021</Text>
                  <Text style={{marginLeft: 11, marginTop: 7}}>3:12 PM</Text>
                </View>
              </View>
              <View>
                <Image
                  source={require('../Images/lft_img.png')}
                  style={{width: 362, height: 200, marginTop: 7}}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View style={{width: '15%'}}>
                  <Button title="Flag " color="orange" />
                </View>
                <View style={{width: '17%'}}>
                  <Button title="Share " color="orange" />
                </View>
                <View style={{width: '16%'}}>
                  <Button title="Likes " color="orange" />
                </View>
                <View style={{width: '27%'}}>
                  <Button title="Comments " color="orange" />
                </View>
              </View>
            </View>

            <View style={styles.post}>
              <View>
                <Text style={{color: 'orange', fontWeight: '800'}}>
                  User Interface PSD Source files Web Designing for web
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Image source={require('../Images/img_6.png')} />
                  <Text style={{marginTop: 7}}>Steave Waugh</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{marginTop: 7}}>11 March 2021</Text>
                  <Text style={{marginLeft: 11, marginTop: 7}}>5:55 PM</Text>
                </View>
              </View>
              <View>
                <Image
                  source={require('../Images/lft_img1.png')}
                  style={{width: 362, height: 200, marginTop: 7}}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View style={{width: '15%'}}>
                  <Button title="Flag " color="orange" />
                </View>
                <View style={{width: '17%'}}>
                  <Button title="Share " color="orange" />
                </View>
                <View style={{width: '16%'}}>
                  <Button title="Likes " color="orange" />
                </View>
                <View style={{width: '27%'}}>
                  <Button title="Comments " color="orange" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginLeft: 8,
    marginRight: 10,
    width: '95%',
    height: 190,
    backgroundColor: '#fbf9f9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  post: {
    marginTop: 12,
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderWidth: 1,
    marginLeft: 5,
    borderColor: 'white',
    backgroundColor: '#fbf9f9',
    color: 'white',
  },
  info: {
    width: 170,
    height: 150,
    marginLeft: 6,
    marginTop: 4,
  },
  nav: {
    width: '100%',
    height: 40,
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'row',
  },
  butt: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containers: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modal: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#00BCD4',
    height: 300,
    width: '80%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: '#3f2949',
  },
});

export default Timeline;
