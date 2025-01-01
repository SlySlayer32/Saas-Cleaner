import React, { useState } from 'react';
    import { View, Text, TextInput, Button, Alert } from 'react-native';

    // Placeholder functions for local storage (since we can't use it directly in WebContainer)
    const setItem = async (key: string, value: string): Promise<void> => {
      console.log(`Simulating local storage: Setting ${key} to ${value}`);
      // In a real app, use AsyncStorage:
      // await AsyncStorage.setItem(key, value);
    };

    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);

      const handleLogin = async () => {
        if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password');
          return;
        }

        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            await setItem('token', data.token);
            Alert.alert('Success', 'Login successful');
            // In a real app, you would navigate to the user's profile page here
            console.log('Simulating navigation to profile page');
          } else {
            Alert.alert('Error', data.error || 'Login failed');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred during login');
        } finally {
          setLoading(false);
        }
      };

      return (
        <View>
          <Text>Login</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} disabled={loading} />
        </View>
      );
    };

    export default Login;
