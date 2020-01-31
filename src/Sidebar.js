import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Thumbnail, ListItem, Left, Icon, Body, Right, Button, Card, CardItem } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

import AsyncStorage from '@react-native-community/async-storage';

export default class Sidebar extends Component {

  onKirimLaporan(){
    this.props.closeDrawer();
    this.props.navigator.navigate('KirimEmail');
  }

  onLogout = async() => {

    this.props.closeDrawer();

    const jalan = await this._resetData();

    if(jalan){
      this.props.navigator.navigate('Login');
    }else{

    }
  }

  _resetData = async () => {


    try {
      await AsyncStorage.setItem('lokasi', '');
      await AsyncStorage.setItem('role', '');
      await AsyncStorage.setItem('table', '');
      await AsyncStorage.setItem('user', '');
      await AsyncStorage.setItem('email', '');
      await AsyncStorage.setItem('telp', '');
      //alert('Data Berhasil Disimpan');

      return true;
    } catch (error) {
      // Error saving data
      console.log(error);

      return false;
    }
  };

  render(){
    console.log(this.props);
    return(
      <View style={ styles.viewStyle }>
        <Grid>
          <Row style={{ height: 200, backgroundColor: 'white',  }}>
            <Col style={{ justifyContent: 'center', alignItems: 'center'}}>
              <Image resizeMode={'contain'} source={require('./img/logo.png')} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }} />
            </Col>
          </Row>
          <Row style={{ padding: 2, backgroundColor: 'white', marginBottom: 2 }} >
            <Col style={{ justifyContent: 'flex-start', padding: 5}}>
              <TouchableOpacity style={{ backgroundColor: 'grey', height: 50}} onPress={()=> this.props.navigator.navigate('Home')}>
                <CardItem style={{ borderBottomWidth: 1}}>
                  <Left style={{ width: 70, flex: 1}}>
                    <Icon name="home" style={{ color: 'grey'}}/>
                  </Left>
                  <Body style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 4}}>
                    <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular'}}>Home</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'grey', height: 50, marginTop: 10}}  onPress={()=> this.onKirimLaporan()}>
                <CardItem style={{ borderBottomWidth: 1}}>
                  <Left style={{ width: 70, flex: 1}}>
                    <Icon name="mail" style={{ color: 'grey'}}/>
                  </Left>
                  <Body style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 4}}>
                    <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular'}}>Kirim Laporan</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'grey', height: 50, marginTop: 10}}  onPress={()=> this.onLogout()}>
                <CardItem style={{ borderBottomWidth: 1}}>
                  <Left style={{ width: 70, flex: 1}}>
                    <Icon name="exit" style={{ color: 'grey'}}/>
                  </Left>
                  <Body style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 4}}>
                    <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular'}}>Logout</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Col>
          </Row>

        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  textStyle: {
    color: '#7cb342',
    fontSize: 18,
    fontFamily: 'Comfortaa',
  },
});
