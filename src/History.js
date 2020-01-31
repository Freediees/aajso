import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker, Footer, FooterTab, Drawer, Header, Container, Content, Card, Left, Body, Right, Title, Subtitle, Icon, H1, Item, Input, CardItem, ListItem, Button } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import axios from 'axios';
import { connect } from 'react-redux';



var Spinner = require('react-native-spinkit');

import Sidebar from './Sidebar';

import { dataItem, baseUrl } from './Variable';


function getChar(x) {

  var matches = x.match(/\b(\w)/g); // ['J','S','O','N']
  var acronym = matches.join(''); // JSON
  var fix = acronym.substr(0,2);

  return fix;
}

class History extends Component{

  constructor(props){
    super(props);
    this.state = {
      judul: this.props.dataGeneral.lokasi,
      loading: true,
      selected: '',
      dataBarang:[],
      outlet: this.props.dataGeneral.table,
      textCari: '',
    }
  }

  static navigationOptions = {
    header: null,
  };

  closeDrawer (){
    this.drawer._root.close()
  };

  openDrawer (){
    this.drawer._root.open()
  };

  componentDidMount(){

    var url = `${baseUrl}/data_barang?status=1&outlet=${this.state.outlet}&role=${this.props.dataGeneral.role}`;
    console.log(url);
    axios.get(`${baseUrl}/data_barang?status=1&outlet=${this.state.outlet}&role=${this.props.dataGeneral.role}&history=0`)
    .then((res)=>{
      //console.log(res.data);

      this.setState({
        loading: false,
        dataBarang: res.data,
      })
    })
    .catch((e)=>{
      //console.log(e);
    });
  }

  onCariChange(text){
    this.setState({
      textCari: text,
    })
  }

  onCari(){
    //console.log(text);

    this.setState({
      loading: true,
    })

    var url = `${baseUrl}/cari_barang/?dept=${this.state.selected}&status=1&id=${this.state.textCari}&outlet=${this.state.outlet}`;
    console.log(url);
    axios.get(`${baseUrl}/cari_barang/?dept=${this.state.selected}&status=1&id=${this.state.textCari}&outlet=${this.state.outlet}&role=${this.props.dataGeneral.role}`)
    .then((res)=>{
      //console.log(res.data);

      this.setState({
        loading: false,
        dataBarang: res.data,
      })
    })
    .catch((e)=>{
      console.log(e);
    });
  }

  renderItem(item){
    //console.log(item);
    return(
      <Card transparent style={{ elevation: 0, borderBottomWidth: 1}}>
        <Row style={{ height: 90}}>
          <Col style={{ justifyContent: 'center', paddingLeft: 10}} onPress={()=> this.props.navigation.navigate('Detail', {
              sku: item.item.sku,
            })
          }>
            <Text style={{ fontSize: 20, fontFamily: 'Raleway-Bold'}}>{item.item.name}</Text>
            <Text style={{ fontSize: 14, color: 'grey', fontFamily: 'Raleway-Regular'}}>SKU : {item.item.sku}</Text>
            <Text style={{ fontSize: 14, color: 'grey', fontFamily: 'Raleway-Regular'}}>Stock : {item.item.dept}</Text>
          </Col>
          <Col style={{ width:70, height: 70,  padding: 5, alignSelf: 'center'}}>
            <View style={{ flex: 1, backgroundColor: '#e1f5fe', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={ styles.textListButton}>{getChar(item.item.name)}</Text>
            </View>
          </Col>
        </Row>
      </Card>
    );
  }

  onValueChange = async(value) => {
    await this.setState({
      loading: true,
      selected: value,
    });

    axios.get(`${baseUrl}/data_barang?dept=${this.state.selected}&status=1&outlet=${this.state.outlet}&role=${this.props.dataGeneral.role}&history=0`)
    .then((res)=>{
      //console.log(res.data);

      this.setState({
        loading: false,
        dataBarang: res.data,
      })
    })
    .catch((e)=>{
      //console.log(e);
    });
  }

  renderList(){

    if(this.state.loading){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner isVisible={true} size={50} type={['Wave']} color={'grey'}/>
          {

            //<Text style={{ fontSize: 18, fontFamily: 'Raleway-Bold', color: '#7cb342' }}>Tunggu Sebentar...</Text>
          }
        </View>
      );
    }

    return(
      <FlatList
        data={this.state.dataBarang}
        renderItem={ (item)=>  this.renderItem(item)}
      />
    );
  }

  render(){
    return(
      <Container>
      <Drawer  openDrawerOffset={0.4} tapToClose={true} ref={(ref) => { this.drawer = ref; }} content={<Sidebar closeDrawer={this.closeDrawer.bind(this)} navigator={this.props.navigation} />} onClose={() => this.closeDrawer()} >

       <StatusBar barStyle = "default" hidden = {false} backgroundColor = "white" />
          <Header style={{ backgroundColor: '#03a9f4'}}>
            <Left style={{ flex: 1}} >
              <TouchableOpacity onPress={()=> this.openDrawer()}>
                <Icon name='menu' style={{ color: 'white'}}/>
              </TouchableOpacity>
            </Left>
            <Body style={{ flex: 5}}>
              <Text style={styles.headerStyle}>{this.state.judul + ' - History' || ''}</Text>
            </Body>

          </Header>
            <Grid>
              <Row style={{ height: 120 }}>
                <Col>
                <View style={{  backgroundColor: '#03a9f4', height: 120, margin: 0, paddingLeft: 16, paddingRight: 16, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <Row style={{ height: 50}}>
                      <Col style={{ flex: 1, justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Raleway-Regular'}}>Departement : </Text>
                      </Col>
                      <Col style={{ flex: 2}}>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" style={{ color: 'white'}} />}
                            style={{ width: undefined, color: 'white' }}
                            placeholder="All"
                            placeholderStyle={{ color: "white" }}
                            placeholderIconColor="white"
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
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Item rounded style= {{ backgroundColor: 'white', marginTop: 10}}>
                          <Input
                            placeholder='Cari' style={{ paddingLeft: 20}}
                            onChangeText={(text)=> this.onCariChange(text)}
                            onSubmitEditing={()=> this.onCari()}
                            />
                        </Item>
                      </Col>
                      <Col style={{ width: 50, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Scanner')}>
                        <Icon name='camera' style={{ color: 'white', marginTop: 10, marginLeft: 10}}/>
                      </Col>
                    </Row>

                </View>
                </Col>
              </Row>

              <Row style={{ marginTop: 10, padding: 10 }}>
                <Col>
                  {this.renderList()}
                </Col>
              </Row>

            </Grid>

            <Footer>
              <FooterTab>
                <Button  style={{ backgroundColor: '#7cb342'}} onPress={()=> {
                  this.props.navigation.pop();
                  this.props.navigation.navigate('Home');
                }
                }>
                  <Text style={{ color: 'white', fontFamily: "Raleway-Bold"}}>List SO</Text>
                </Button>
                <Button style={{ backgroundColor: '#03a9f4'}}>
                  <Text style={{ color: 'white', fontFamily: 'Raleway-Bold'}}>History</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Drawer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
  },
  textListButton: {
    color: '#03a9f4',
    fontSize: 23,
    fontFamily: 'Raleway-Bold',
  }
});


function mapStateToProps(state){
  return {
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps)(History);
