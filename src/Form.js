import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Picker, Item, Icon, Button, Input, Toast } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';

import { setUser, setEmail, setTelp } from './actions';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      user: '',
      email: '',
      telp: '',
    }
  }

  componentDidMount(){
    //this.alertData();
  }

  alertData = async() => {
    try {
      const value = await AsyncStorage.getItem('user');

      console.log('hemeh');
      console.log(value);

      if (value !== null) {
        this.props.navigation.navigate('Home');
      }else{

      }

    } catch(e) {
      //read error
      alert(e);
    }
  }


  onNama(text){
    this.setState({
      user: text,
    })
  }

  onEmail(text){
    this.setState({
      email: text,
    })
  }

  onTelp(text){
    this.setState({
      telp: text,
    })
  }



  onLogin = async() => {
    // if(this.state.user == '9' && this.state.code == '1234'){
    //   Toast.show({
    //     text: 'Login Berhasil',
    //     buttonText: 'Okay',
    //   });
    //   this.props.navigation.navigate('Home');
    // }else{
    //   Toast.show({
    //     text: 'Kode Salah',
    //     position: 'top',
    //     buttonText: 'Okay',
    //     type: 'danger'
    //   });
    // }

    if(this.state.user == '' || this.state.email == '' || this.state.telp==''){
      alert('Lengkapi Data');
    }else{
      this.props.setUser(this.state.user);
      this.props.setTelp(this.state.telp);
      this.props.setEmail(this.state.email);

      await AsyncStorage.setItem('user', this.state.user);
      await AsyncStorage.setItem('telp', this.state.telp);
      await AsyncStorage.setItem('email', this.state.email);

      this.props.navigation.navigate('Home');
    }
  }

  render(){

    console.log('Form page');
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>


          <Item rounded style={{ backgroundColor: '#e0e0e0', marginTop: 10, marginBottom: 10, elevation: 3 }}>
            <Icon active name='people' style={{ marginLeft: 10}} />
            <Input placeholder="Nama"
              value={this.state.nama}
              onChangeText={( text )=> this.onNama(text) }
            />
          </Item>

          <Item rounded style={{ backgroundColor: '#e0e0e0', marginTop: 10, marginBottom: 10, elevation: 3 }}>
            <Icon active name='people' style={{ marginLeft: 10}} />
            <Input placeholder="Email"
              value={this.state.email}
              onChangeText={( text )=> this.onEmail(text) }
            />
          </Item>

          <Item rounded style={{ backgroundColor: '#e0e0e0', marginTop: 10, marginBottom: 10, elevation: 3 }}>
            <Icon active name='key' style={{ marginLeft: 10}} />
            <Input placeholder="Telp"
              value={this.state.telp}
              keyboardType="numeric"
              onChangeText={( text )=> this.onTelp(text) }
            />
          </Item>

          <Button full rounded style={{ elevation: 3, backgroundColor: '#7cb342'}} onPress={()=> this.onLogin()}>
            <Text style={{ color: 'white', fontFamily: 'Raleway-Regular', fontSize: 20}}>Login</Text>
          </Button>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps, {setUser, setTelp, setEmail})(Login);
