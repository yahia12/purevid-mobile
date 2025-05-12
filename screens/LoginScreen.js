import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useAuth } from '../contexts/AuthContext';
import { makeRedirectUri } from 'expo-auth-session';

export default function LoginScreen() {
  const { setUser } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '473871113614-76lb5efbuofe2a2m7po73rnvb7elqs31.apps.googleusercontent.com',
    iosClientId: '473871113614-76lb5efbuofe2a2m7po73rnvb7elqs31.apps.googleusercontent.com',
    androidClientId: '473871113614-76lb5efbuofe2a2m7po73rnvb7elqs31.apps.googleusercontent.com',
    webClientId: '473871113614-76lb5efbuofe2a2m7po73rnvb7elqs31.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      scheme: 'exp',
    }),
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setUser(authentication);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
