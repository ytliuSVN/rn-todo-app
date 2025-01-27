import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LockScreen() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const result = await LocalAuthentication.authenticateAsync();

        if (result.success) {
          router.replace('/');
        }
      } catch (error) {
        Alert.alert('Error', 'Authentication failed');
      }
    };

    authenticate();
  }, []);

  const handleUnlock = () => {
    if (password === '1234') {
      router.replace('/'); // Navigate to index
    } else {
      Alert.alert('Error', 'Incorrect password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Unlock' onPress={handleUnlock} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});
