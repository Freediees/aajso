import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Picker, Item, Icon, Button, Input, Toast, Container } from 'native-base';

import { connect } from 'react-redux';
import axios from 'axios';

import { setLokasi, setRole, setTable } from './actions';

var Spinner = require('react-native-spinkit');


import { Grid, Row, Col } from 'react-native-easy-grid';

class KirimEmail extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      user: '',
      email: '',
      isFetching: false,
      selected: '',
    }
  }

  onEmail(text){
    this.setState({
      email: text,
    })
  }

  onValueChange(value){
    this.setState({
      selected: value,
    });
  }


  onSubmit(){

    if( this.state.email == ""){

      alert("Silahkan isi email")

    }else{
      this.setState({
        isFetching: true,
      })

      const email = this.state.email;
      const lokasi = this.props.dataGeneral.lokasi;
      const pelaksana = this.props.dataGeneral.user;
      const outlet = this.props.dataGeneral.table;
      const telp = this.props.dataGeneral.telp;
      const dept = this.state.selected;

      //const user = 'owner';
      //const pass = 'Sp4tnick';

      let data = {
        email: email,
      	lokasi: lokasi,
        pelaksana: pelaksana,
        outlet: outlet,
        no_handphone: telp,
        dept: dept,
      }

      const opt = {
        //headers: {'Content-Type': 'application/json', 'api-key':'kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s'},
        headers: {'Content-Type': 'application/json'},
        url: 'http://portal.aartijaya.com/Api/aksi_kirim',
        data: data,
        method: 'post'
      }

      //console.log(opt);

      axios(opt)
      .then( async(res) =>
        {
          this.setState({
            isFetching: false,
          })

          //console.log('hemeh');
          console.log(res.status);
          if(res.status){

            //console.log(res);
            //await this._storeData(res.data);
            //this.props.setDataUser(res.data.data);
            alert('Laporan sudah dikirim ke email, cek inbox / spam anda');
            this.props.navigation.navigate("Home");
          }else{
            alert('Kirim laporan gagal');
          }
        }
      ).catch((error) => {
        console.log(error);

        // this.setState({
        //   isFetching: false,
        // })
        this.setState({
          isFetching: false,
        })
        alert("Gagal kirim report");
      });


    }

  }

  renderBody(){
    if(this.state.isFetching == true){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Spinner isVisible={true} size={50} type={['Wave']} color={'teal'}/>
          <Text>Tunggu Sebentar, laporan sedang diproses</Text>
        </View>
      );
    }else{
      return(


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>

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
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="All" value=''  />
              <Picker.Item label="Sajadah" value="Sajadah" />
              <Picker.Item label="Sajadah Roll" value="Sajadah Roll" />
              <Picker.Item label="Carpet" value="Carpet" />
              <Picker.Item label="Kudung" value="Kudung" />
              <Picker.Item label="Perlengkapan Haji" value="Perl Haji" />
              <Picker.Item label="Tasbih" value="Tasbih" />
              <Picker.Item label="Sorban" value="Sorban" />
              <Picker.Item label="Taqwa" value="Taqwa" />
              <Picker.Item label="Baju" value="Baju" />
              <Picker.Item label="Kopiah" value="Kopiah" />
              <Picker.Item label="Sarung" value="Sarung" />
              <Picker.Item label="Mukena" value="Mukena" />
              <Picker.Item label="Promosi" value="Promosi" />
              <Picker.Item label="Al Qur'an" value="Al Qur'an" />
              <Picker.Item label="Zaleera" value="Zaleera" />
              <Picker.Item label="Aksesories" value="Aksesories" />
              <Picker.Item label="Oleh-oleh" value="Oleh-oleh" />
              <Picker.Item label="Skin Care" value="Skin Care" />
              <Picker.Item label="Makanan" value="Makanan" />
              <Picker.Item label="Makanan Non Repacking" value="Makanan Non Repacking" />
              <Picker.Item label="Arofah" value="Arofah" />
              <Picker.Item label="Kafiyah" value="Kafiyah" />
              <Picker.Item label="Bahan Packing" value="Bahan Packing" />
              <Picker.Item label="Makloon" value="Makloon" />
              <Picker.Item label="Packing Makanan DM" value="Packing Makanan DM" />
              <Picker.Item label="Parfum" value="Parfum" />
              <Picker.Item label="Bahan" value="Bahan" />
              <Picker.Item label="Pashmina" value="Pashmina" />
              <Picker.Item label="Sykava" value="Sykava" />
              <Picker.Item label="Etnika" value="Etnika" />

            </Picker>
          </Item>

          </View>
          </Col>
        </Row>

            <Item rounded style={{ backgroundColor: '#e0e0e0', marginTop: 10, marginBottom: 10, elevation: 3 }}>
              <Icon active name='mail' style={{ marginLeft: 10}} />
              <Input placeholder="Email"
                value={this.state.email}
                keyboardType="email"
                onChangeText={( text )=> this.onEmail(text) }
              />
            </Item>

            <Button full rounded style={{ elevation: 3, backgroundColor: '#7cb342'}} onPress={()=> this.onSubmit()}>
              <Text style={{ color: 'white', fontFamily: 'Raleway-Regular', fontSize: 20}}>Kirim</Text>
            </Button>
        </View>
      );
    }
  }

  render(){
    return(
      <Container >
        { this.renderBody() }
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps, { setRole, setLokasi, setTable })(KirimEmail);
