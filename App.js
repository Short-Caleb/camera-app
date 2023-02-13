import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable, Image } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import React, {useState, useRef, useEffect } from 'react'
import * as MediaLibrary from 'expo-media-library';
import Feather from '@expo/vector-icons/Feather';


export default function App() {
 
 const [cameraType, setCameraType] = useState(CameraType.front);
 const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
 const [hasCameraPermission, setHasCameraPermission] = useState(null);
 const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
 const [image, setImage] = useState(null);
 
 
 //const cameraRef = useRef(null);
 let cameraRef = useRef(null);

 useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
 }, []); 

 if(hasCameraPermission === false) {
  return (
    <Text>No Camera Permissions</Text>
  );
 };
 
const takePicture = async () => {
  console.log("in takePicture")
    if(cameraRef) {
      console.log("...with camerRef")
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
};

const savePicture = async () => {
  if (image) {
    try {
      const asset = await MediaLibrary.createAssetAsync(image);
      alert('Picture Saved!!');
      setImage(null);
      console.log('saved successfully');
    } catch (error)  {
      console.log(error);
    }
  }
};

/*const takeVideo = async () => {
  console.log('in takeVideo')
  if(cameraRef) {
    console.log('..with cameraRef')
    try{
      const data = await cameraRef.current.recordAsync
    }
  }
}*/

if(!image) {
  return (
    <SafeAreaView style={styles.container}>
     <Camera
     style={styles.camera}
     type={cameraType}
     ref={cameraRef}
     flashMode={flashMode}
     >
    
      </Camera>
      <View style={styles.controlContainer}>
        <Pressable onPress={takePicture}>
        <Feather name='camera' style={styles.cameraButton} size={48} color='white' />
        </Pressable>
        </View> 
    </SafeAreaView>
  );
} else {
  return(
      <SafeAreaView style={styles.container}>
      <Image source={{uri: image}} style={styles.camera} />

      <View style={styles.controlContainer}>
        <Pressable onPress={ () => setImage(null)}>
        <Feather name='thumbs-down' style={styles.cameraButton} size={48} color='white' />
        </Pressable>
        <Pressable onPress={savePicture}>
        <Feather name='thumbs-up' style={styles.cameraButton} size={48} color='white' />
        </Pressable>
        </View> 
    </SafeAreaView> 
      );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  camera: {
    flex: 1,

  },
  cameraButton: {
    
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   backgroundColor: 'black'
  },

  previewButton: {
    
  }
});
