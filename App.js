import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, Image } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import React, {useState, useRef, useEffect } from 'react'
import Feather from '@expo/vector-icons/Feather';


export default function App() {
 
 const [cameraType, setCameraType] = useState(CameraType.front);
 const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
 const [hasCameraPermission, setHasCameraPermission] = useState(null);
 const [image, setImage] = useState(null);
 
 
 //const cameraRef = useRef(null);
 let cameraRef = useRef(null);

 useEffect(() => {
    (async () => {
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
        setImage(data);
      } catch (error) {
        console.log(error);
      }
    }
}

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
        <Feather name='circle' style={styles.cameraButton} size={48} color='white' />
        </Pressable>
        </View> 
    </SafeAreaView>
  );
} else {
  return(
      <SafeAreaView style={styles.container}>
      <Image source={{uri: image.uri}} style={styles.camera} />

      <View style={styles.controlContainer}>
        <Pressable onPress={ () => setImage(null)}>
        <Feather name='circle' style={styles.cameraButton} size={48} color='white' />
        </Pressable>
        <Pressable onPress={ () => setImage(null)}>
        <Feather name='circle' style={styles.cameraButton} size={48} color='white' />
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
    justifyContent: 'center',
    alignItems: 'center',
   backgroundColor: 'black'
  },

  previewButton: {
    
  }
});
