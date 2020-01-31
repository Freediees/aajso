import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Picker, Item, Icon, Button, Input, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

import { connect } from 'react-redux';

import { setLokasi, setRole, setTable, setUser, setEmail, setTelp } from './actions';


import { Grid, Row, Col } from 'react-native-easy-grid';

class Telkom extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      user: '',
      code: '',
      isFetching: false,
    }
  }

  componentDidMount(){

    axios.get(`http://treg6.id:276/cr6/naisget/getScheme.php?key=d-6607`)
    .then((res)=>{
      console.log(res);
    })
    .catch((e)=>{
      console.log(e);
    });

  }



  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 20}}>


      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps, { setRole, setLokasi, setTable, setUser, setEmail, setTelp })(Telkom);
