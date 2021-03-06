'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: 'white', fontSize: 20 }}>Waiting</Text>
  </View>
);

class Scanner extends Component {

  constructor(props){
    super(props);
    this.state = {
      flash: RNCamera.Constants.FlashMode.torch,
    }
  }

  static navigationOptions = {
    header: null,
  };


  onBarCodeRead = (e) => {
      //alert("Barcode value is"+e.data ,"Barcode type is"+e.type);
      this.props.navigation.pop();
      this.props.navigation.push('Detail', {
        sku: e.data,
      })
  }

  changeFlash(){
    if(this.state.flash == RNCamera.Constants.FlashMode.torch){
      this.setState({
        flash: RNCamera.Constants.FlashMode.off
      });
    }else{
      this.setState({
        flash: RNCamera.Constants.FlashMode.torch
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flash}
          onBarCodeRead={this.onBarCodeRead}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.changeFlash()} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}>Flash</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Scanner;
