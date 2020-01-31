import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Item, Footer, Container, Content, H1, Card, Left, Body, Right, CardItem, Accordion, Icon, List, ListItem, Textarea, Button, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import axios from 'axios';

import { connect } from 'react-redux';

import { dataRiwayat, sampleDetailPO, dataProduk, baseUrl } from './Variable';

let posisi = true;

class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
    headerStyle: {
      backgroundColor: '#7cb342',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state = {
      dataBarang:{},
      name: '',
      sku: '',
      stok_moka: 0,
      stok_real: 0,
      stok_gudang: 0,
      stok_area: 0,
      stok_lain: 0,
      stok_revisi: 0,
      dept: '',
      status_so: '',
      status_h0: '',
      catatan: '',
      catatan_revisi: '',
      outlet: this.props.dataGeneral.table,
    }
  }

  componentDidMount(){
    var sku = this.props.navigation.getParam('sku' || 0);
    //console.log('No Sku adalah : ' + sku);

    var url = `${baseUrl}/cari_barang/?id=${sku}&outlet=${this.state.outlet}`;
    console.log(url);

    axios.get(`${baseUrl}/cari_barang/?id=${sku}&outlet=${this.state.outlet}`)
    .then((res)=>{
      console.log(res);
      //console.log(res.data[0]);

     this.setState({
        name: res.data[0].name,
        sku: res.data[0].sku,
        stok_moka: res.data[0].stok_moka || '0',
        stok_real: res.data[0].stok_real || '0',
        stok_gudang: res.data[0].stok_gudang || '0',
        stok_area: res.data[0].stok_area || '0',
        stok_lain: res.data[0].stok_lain || '0',
        stok_revisi: res.data[0].stok_revisi || '0',
        dept: res.data[0].dept,
        status_so: res.data[0].status_so,
        status_ho: res.data[0].status_ho,
        catatan: res.data[0].catatan || '',
        catatan_revisi: res.data[0].catatan_revisi || '',
       })
    })
    .catch((e)=>{
      console.log(e);
    });
  }


  renderCekStatus(){

    var cetak;
    if(this.props.dataGeneral.role == 1){
      if(this.state.status_so == 0){
        cetak = <Text style={{ color: 'red'}}>Belum SO</Text>
      }else{
        cetak = <Text style={{ color: 'green'}}>Sudah SO</Text>
      }
    }else{
      if(this.state.status_ho == 0){
        cetak = <Text style={{ color: 'red'}}>Belum SO</Text>
      }else{
        cetak = <Text style={{ color: 'green'}}>Sudah SO</Text>
      }
    }


    return cetak;
  }

  updateStokMoka(text){
    if(text == ''){
      this.setState({
        stok_moka: '0'
      });
    }else{
      this.setState({
        stok_moka : text
      })
    }

  }

  updateStokReal(text){
    this.setState({
      stok_real : text
    })
  }

  updateStokGudang(text){
      this.setState({
        stok_gudang : text
      })
  }
  updateStokArea(text){
      this.setState({
        stok_area : text
      })
  }
  updateStokLain(text){
      this.setState({
        stok_lain : text
      })
  }

  updateStokRevisi(text){
      this.setState({
        stok_revisi : text
      })
  }

  onChangeCatatan(text){
    this.setState({
      catatan: text,
    });
  }

  onChangeCatatanRevisi(text){
    this.setState({
      catatan_revisi: text,
    });
  }

  onButtonSimpan(){

    var sku = this.state.sku;
    var stok_gudang = this.state.stok_gudang;
    var stok_area = this.state.stok_area;
    var stok_lain = this.state.stok_lain;
    var catatan= this.state.catatan;
    var stok_real = this.getTotal();
    var user = this.props.dataGeneral.user;

    // var url = `${baseUrl}/update_data/?user=${user}&sku=${sku}&stok_gudang=${stok_gudang}&stok_area=${stok_area}&stok_lain=${stok_lain}&stok_real=${stok_real}&catatan=${catatan}&outlet=${this.state.outlet}`;
    // console.log(url);
    axios.get(`${baseUrl}/update_data/?user=${user}&sku=${sku}&stok_gudang=${stok_gudang}&stok_area=${stok_area}&stok_lain=${stok_lain}&stok_real=${stok_real}&catatan=${catatan}&outlet=${this.state.outlet}`)
      .then((res)=>{
        alert('Berhasil disimpan');
        this.props.navigation.pop();
        this.props.navigation.navigate('Home');
      })
      .catch((e)=>{
        console.log(e);
      });

    // axios.get(`${baseUrl}/update_data/?sku=${this.state.sku}&stok_moka=${this.state.stok_moka}&stok_real=${this.state.stok_real}&outlet=${this.state.outlet}`)
    //   .then((res)=>{
    //     alert('Berhasil disimpan');
    //     this.props.navigation.pop();
    //     this.props.navigation.navigate('Home');
    //   })
    //   .catch((e)=>{
    //     console.log(e);
    //   });
  }

  onSimpanRevisi(){

    var sku = this.state.sku;
    var catatan = this.state.catatan_revisi;
    var stok_real = this.state.stok_revisi;
    var user = this.props.dataGeneral.user;

    var url = `${baseUrl}/revisi_data/?user=${user}&sku=${sku}&stok_revisi=${stok_real}&outlet=${this.state.outlet}`;
    console.log(url);

    axios.get(`${baseUrl}/revisi_data/?user=${user}&sku=${sku}&stok_revisi=${stok_real}&outlet=${this.state.outlet}`)
      .then((res)=>{
        alert('Berhasil disimpan');
        this.props.navigation.pop();
        this.props.navigation.navigate('Home');
      })
      .catch((e)=>{
        console.log(e);
      });
  }

  getTotal(){


    var a = parseInt(this.state.stok_gudang || 0) + parseInt(this.state.stok_area || 0) + parseInt(this.state.stok_lain || 0);

    return a.toString();
  }

  getSelisihAdmin(){
    var b = this.state.stok_revisi || 0;
    var a = parseInt(b) - parseInt(this.state.stok_moka);

    return a.toString();
  }

  getSelisih(){

    var b = this.state.stok_real || 0;
    var a = parseInt(b) - parseInt(this.state.stok_moka);

    return a.toString();
  }

  renderByRole(){
    if(this.props.dataGeneral.role == 0){
      return(
        <Container>
          <View style={{ flex: 1, padding: 16}}>
            <Row style={{ height: 70 }}>
              <Col>
                <Text style={{ fontSize: 15, color: 'grey'}}>Item Name</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold'}}>{this.state.name || ''}</Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 15, color: 'grey'}}>SKU</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold'}}>{this.props.navigation.getParam('sku') || 'No SKU'}</Text>
              </Col>
            </Row>

            <Text style={{ fontSize: 15, color: 'grey'}}>Informasi SO Outlet</Text>
            <Row style={{ height: 100, marginBottom: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stok Gudang</Text>
                <Item rounded style={{ paddingLeft: 10, backgroundColor: '#cfd8dc'}}>
                  <Input
                    disabled
                    value={this.state.stok_gudang}
                    placeholder = '0'
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokGudang(text)}
                  />
                </Item>
              </Col>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stock Area</Text>
                <Item rounded style={{ paddingLeft: 10, backgroundColor: '#cfd8dc'}}>
                  <Input
                    disabled
                    value={this.state.stok_area}
                    placeholder = '0'
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokArea(text)}
                  />
                </Item>
              </Col>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stok Lain</Text>
                <Item rounded style={{ paddingLeft: 10, backgroundColor: '#cfd8dc'}}>
                  <Input
                    disabled
                    value={this.state.stok_lain}
                    placeholder= '0'
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokLain(text)}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={{ height: 80 }}>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Total Stok SO HO</Text>
                <Item rounded style={{ paddingLeft: 10}}>
                  <Input
                    value= { this.state.stok_revisi }
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokRevisi(text)}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={{ height: 80 }}>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stok Moka</Text>
                <Item rounded style={{ paddingLeft: 10, backgroundColor: '#cfd8dc'}}>
                  <Input
                    disabled
                    value= {this.state.stok_moka}
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokMoka(text)}
                  />
                </Item>
              </Col>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Selisih</Text>
                <Item rounded style={{ paddingLeft: 10}}>
                  <Input
                    disabled
                    value= {this.getSelisihAdmin() || '0'}
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokReal(text)}
                  />
                </Item>
              </Col>
            </Row>



            <Row style={{ height: 70, marginTop: 20 }}>
              <Col>
                <Text style={{ fontSize: 17, color: 'grey'}}>Departement : {this.state.dept || ''} </Text>
                <Text style={{ fontSize: 17, color: 'grey', marginTop: 5}}>Status : {this.renderCekStatus()} </Text>
              </Col>
            </Row>
            <Row>
              <Col>

                {

                  //<Text style={{ fontSize: 17, color: 'grey'}}>Catatan</Text>
                  //<Textarea rowSpan={5} bordered placeholder="" value={this.state.catatan_revisi} onChangeText={(text)=> this.onChangeCatatanRevisi(text)} />
                }

                <Button style={{ backgroundColor: '#7cb342', marginTop: 20}} full rounded onPress={()=> this.onSimpanRevisi()}>
                  <Text style={{ color: 'white'}}>Simpan</Text>
                </Button>
              </Col>

            </Row>




          </View>

        </Container>
      );
    }else{
      return(
        <Container>
          <View style={{ flex: 1, padding: 16}}>
            <Row style={{ height: 70 }}>
              <Col>
                <Text style={{ fontSize: 15, color: 'grey'}}>Item Name</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold'}}>{this.state.name || ''}</Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 15, color: 'grey'}}>SKU</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold'}}>{this.props.navigation.getParam('sku') || 'No SKU'}</Text>
              </Col>
            </Row>

            <Row style={{ height: 80 }}>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stok Gudang</Text>
                <Item rounded style={{ paddingLeft: 10}}>
                  <Input
                    value={this.state.stok_gudang}
                    placeholder = '0'
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokGudang(text)}
                  />
                </Item>
              </Col>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stock Area</Text>
                <Item rounded style={{ paddingLeft: 10}}>
                  <Input
                    value={this.state.stok_area}
                    placeholder = '0'
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokArea(text)}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={{ height: 80 }}>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Stok Lain</Text>
                <Item rounded style={{ paddingLeft: 10}}>
                  <Input
                    value={this.state.stok_lain}
                    placeholder= '0'
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokLain(text)}
                  />
                </Item>
              </Col>
              <Col style={{ margin: 5}}>
                <Text style={{ fontSize: 15, color: 'grey', margin: 5}}>Total Stok</Text>
                <Item rounded style={{ paddingLeft: 10, backgroundColor: '#cfd8dc'}}>
                  <Input
                    disabled
                    value= { this.getTotal()}
                    keyboardType="numeric"
                    onChangeText = {(text) => this.updateStokReal(text)}
                  />
                </Item>
              </Col>
            </Row>



            <Row style={{ height: 70, marginTop: 20 }}>
              <Col>
                <Text style={{ fontSize: 17, color: 'grey'}}>Departement : {this.state.dept || ''} </Text>
                <Text style={{ fontSize: 17, color: 'grey', marginTop: 5}}>Status : {this.renderCekStatus()} </Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={{ fontSize: 17, color: 'grey'}}>Catatan</Text>
                <Textarea rowSpan={5} bordered placeholder="" value={this.state.catatan} onChangeText={(text)=> this.onChangeCatatan(text)} />

                <Button style={{ backgroundColor: '#7cb342', marginTop: 20}} full rounded onPress={()=> this.onButtonSimpan()}>
                  <Text style={{ color: 'white'}}>Simpan</Text>
                </Button>
              </Col>

            </Row>




          </View>

        </Container>
      );
    }
  }


  render(){
    //console.log(this.state);
    return(
      <ScrollView>
        {this.renderByRole()}
      </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
    headerText: {
      fontSize: 18,
      fontFamily: 'Comfortaa',
    }
});

function mapStateToProps(state){
  return {
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps,{})(Detail);
