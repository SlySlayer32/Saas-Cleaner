import React, { useState } from 'react';
    import { View, Text, TextInput, Button, Alert } from 'react-native';

    const Registration = () => {
      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);

      const handleRegister = async () => {
        if (!username || !email || !password) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
        }

        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            Alert.alert('Success', data.message);
            // Clear the form
            setUsername('');
            setEmail('');
            setPassword('');
          } else {
            Alert.alert('Error', data.error || 'Registration failed');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred during registration');
        } finally {
          setLoading(false);
        }
      };

      return (
        <View>
          <Text>Registration</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
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
          <Button title="Register" onPress={handleRegister} disabled={loading} />
        </View>
      );
    };

    export default Registration;
