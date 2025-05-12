k// screens/UploadScreen.js

import React, { useState } from 'react';
import { View, Button, ActivityIndicator, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../constants/firebaseConfig'; // Import the initialized app

export default function UploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      uploadVideo(result.uri);
    }
  };

  const uploadVideo = async (uri) => {
    setUploading(true);

    const storage = getStorage(app);
    const response = await fetch(uri);
    const blob = await response.blob();

    const filename = `videos/${Date.now()}.mp4`;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Optional: You can track upload progress here if you want
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Video to Upload" onPress={pickVideo} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {downloadURL ? <Text style={{ marginTop: 20 }}>Uploaded! URL: {downloadURL}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

