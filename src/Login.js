import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Picker, Item, Icon, Button, Input, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';

import { setLokasi, setRole, setTable, setUser, setEmail, setTelp } from './actions';


import { Grid, Row, Col } from 'react-native-easy-grid';

class Login extends Component {
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
    this.alertData();
  }



  onPassword(text){
    this.setState({
      code: text,
    })
  }

  onValueChange(value){
    this.setState({
      user: value,
    })
  }

  alertData = async() => {
    try {
      const lokasi = await AsyncStorage.getItem('lokasi');
      const user = await AsyncStorage.getItem('user');
      const role = await AsyncStorage.getItem('role');
      const table = await AsyncStorage.getItem('table');
      const telp = await AsyncStorage.getItem('telp');
      const email = await AsyncStorage.getItem('email');

      this.props.setUser(user);
      this.props.setEmail(email);
      this.props.setLokasi(lokasi);
      this.props.setTable(table);
      this.props.setTelp(telp);
      this.props.setRole(role);

      if (lokasi !== null && user !== null) {



        this.props.navigation.navigate('Home');
      }else{

      }

    } catch(e) {
      //read error
      alert(e);
    }
  }


  _storeData = async (lokasi, role, table) => {

    console.log(lokasi);
    console.log(role);
    console.log(table);

    try {
      await AsyncStorage.setItem('lokasi', lokasi);
      await AsyncStorage.setItem('role', role);
      await AsyncStorage.setItem('table', table);
      //alert('Data Berhasil Disimpan');

      return true;
    } catch (error) {
      // Error saving data
      console.log(error);

      return false;
    }
  };

  onLogin = async() => {

    this.setState({
      isFetching: true,
    })

    var status = 0;

    if(this.state.code == '080989'){
      if(this.state.user == 'JAKARTA'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_jakarta');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'SURABAYA'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_surabaya');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'AARTIJAYA HO'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_ho');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'BEKASI'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_bekasi');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'BOGOR'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_bogor');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'BSD'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_bsd');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'CIBUBUR'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_cibubur');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'CITARUM'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_citarum');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'INHOFTANK'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_inhoftank');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'MALANG'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_malang');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'MTC'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_mtc');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'PONDOK PINANG'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_pdp');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'SERANG'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_serang');
        this.props.setRole('0');

        status = 1;
      }else if(this.state.user == 'UJUNGBERUNG'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_uber');
        this.props.setRole('0');

        status = 1;
      }
    }else{
      if(this.state.user == 'JAKARTA' && this.state.code == '301667'){
        await this.props.setLokasi(this.state.user);
        await this.props.setTable('m_barang_jakarta');
        await this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'SURABAYA' && this.state.code == '856555'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_surabaya');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'AARTIJAYA HO' && this.state.code == '862723'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_ho');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'BEKASI' && this.state.code == '281168'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_bekasi');
        this.props.setRole('1');

        status = 1;
      }
      else if(this.state.user == 'BOGOR' && this.state.code == '338403'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_bogor');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'BSD' && this.state.code == '502417'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_bsd');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'CIBUBUR' && this.state.code == '117082'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_cibubur');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'CITARUM' && this.state.code == '613352'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_citarum');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'INHOFTANK' && this.state.code == '409049'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_inhoftank');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'MALANG' && this.state.code == '126473'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_malang');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'MTC' && this.state.code == '198604'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_mtc');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'PONDOK PINANG' && this.state.code == '469368'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_pdp');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'SERANG' && this.state.code == '768249'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_serang');
        this.props.setRole('1');

        status = 1;
      }else if(this.state.user == 'UJUNGBERUNG' && this.state.code == '242181'){
        this.props.setLokasi(this.state.user);
        this.props.setTable('m_barang_uber');
        this.props.setRole('1');

        status = 1;
      }
    }

    if(status == 1){



      const lokasi = await this.state.user;
      const role = await this.props.dataGeneral.role;
      const table = await this.props.dataGeneral.table;

      var abc = false;
      abc = await this._storeData(lokasi, role, table);

      if(abc == true){
        this.setState({
          isFetching: false,
        });
        console.log('bener tuh');

        Toast.show({
          text: 'Login Berhasil',
          buttonText: 'Okay',
        });

        this.props.navigation.navigate('Form');


      }else{
        this.setState({
          isFetching: false,
        });
        console.log('salah tuh');
      }


      //this.props.navigation.navigate('Form');
    }else{
      this.setState({
        isFetching: false,
      });
      Toast.show({
        text: 'Kode Salah',
        position: 'top',
        buttonText: 'Okay',
        type: 'danger'
      });
    }


    // this.props.setLokasi('Surabaya');
    // this.props.setTable('m_barang_surabaya');
    // this.props.setRole('2');

    //this.props.navigation.navigate('Form')
  }

  renderButton(){
    if(this.state.isFetching){
      <Button full rounded style={{ elevation: 3, backgroundColor: 'red'}}>
        <Text style={{ color: 'white', fontFamily: 'Raleway-Regular', fontSize: 20}}>Tunggu Sebentar</Text>
      </Button>
    }else{
      return(
        <Button full rounded style={{ elevation: 3, backgroundColor: '#7cb342'}} onPress={()=> this.onLogin()}>
          <Text style={{ color: 'white', fontFamily: 'Raleway-Regular', fontSize: 20}}>Login</Text>
        </Button>
      );
    }
  }

  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 20}}>

          <Image resizeMode={'contain'} source={require('./img/logo.png')} style={{ width: 400, height: 400, justifyContent: 'center', alignItems: 'center' }} />
          <Row style={{ height: 50, marginBottom: 10}}>
            <Col>
            <View style={{ elevation: 1, backgroundColor: '#e0e0e0', height: 60, borderRadius: 30, justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
            <Item picker>
              <Picker
                mode='dialog'
                iosIcon={<Icon name="arrow-down" style={{ color: 'white'}} />}
                style={{ width: undefined, color: 'black' }}
                placeholder="Outlet"
                placeholderStyle={{ color: "blue" }}
                placeholderIconColor="blue"
                selectedValue={this.state.user}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Outlet" value='1'  />
                <Picker.Item label="AARTIJAYA" value='AARTIJAYA HO'  />
                <Picker.Item label="BEKASI" value='BEKASI'  />
                <Picker.Item label="BOGOR" value='BOGOR'  />
                <Picker.Item label="BSD" value='BSD'  />
                <Picker.Item label="CIBUBUR" value='CIBUBUR'  />
                <Picker.Item label="CITARUM" value='CITARUM'  />
                <Picker.Item label="INHOFTANK" value='INHOFTANK'  />
                <Picker.Item label="JAKARTA" value='JAKARTA'  />
                <Picker.Item label="MALANG" value='MALANG'  />
                <Picker.Item label="MTC" value='MTC'  />
                <Picker.Item label="ONLINE" value='ONLINE'  />
                <Picker.Item label="PONDOK PINANG" value='PONDOK PINANG'  />
                <Picker.Item label="SERANG" value='SERANG'  />
                <Picker.Item label="SURABAYA" value='SURABAYA'  />
                <Picker.Item label="UJUNGBERUNG" value='UJUNGBERUNG'  />

              </Picker>
            </Item>

            </View>
            </Col>
          </Row>

          <Item rounded style={{ backgroundColor: '#e0e0e0', marginTop: 10, marginBottom: 10, elevation: 3 }}>
            <Icon active name='key' style={{ marginLeft: 10}} />
            <Input placeholder="Code"
              value={this.state.code}
              keyboardType="numeric"
              secureTextEntry={true}
              onChangeText={( text )=> this.onPassword(text) }
            />
          </Item>

          {this.renderButton()}

      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps, { setRole, setLokasi, setTable, setUser, setEmail, setTelp })(Login);
