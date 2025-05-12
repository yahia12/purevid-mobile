import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Platform, Alert, PermissionsAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [uploading, setUploading] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your media library',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const uploadVideo = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access media library');
      return;
    }

    const result = await launchImageLibrary({ mediaType: 'video' });

    if (result.didCancel || !result.assets || result.assets.length === 0) {
      return;
    }

    const video = result.assets[0];
    const fileName = `videos/${Date.now()}_${video.fileName || 'upload.mp4'}`;
    const reference = storage().ref(fileName);

    setUploading(true);

    try {
      await reference.putFile(video.uri);
      const downloadUrl = await reference.getDownloadURL();

      await firestore().collection('videos').add({
        url: downloadUrl,
        status: 'pending',
        timestamp: new Date(),
        uploader: 'CLIUploader',
        uploaderEmail: 'cli@purevid.app',
      });

      Alert.alert('Success', 'Video uploaded & added to Firestore as pending.');
    } catch (err) {
      console.error('Upload Error:', err);
      Alert.alert('Error', 'Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PureVid Mobile Uploader</Text>
      <Button title={uploading ? 'Uploading...' : 'Upload Video'} onPress={uploadVideo} disabled={uploading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, marginBottom: 20 },
});

export default App;
