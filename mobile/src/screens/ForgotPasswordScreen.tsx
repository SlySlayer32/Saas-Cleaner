import React, { useState } from 'react';
  import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

  const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
      if (!email) {
        Alert.alert('Error', 'Please enter your email address');
        return;
      }

      setLoading(true);
      try {
        // Simulate sending a password reset request to the backend
        const response = await new Promise<{ success: boolean; message?: string }>((resolve) => {
          setTimeout(() => {
            if (email === 'test@example.com') {
              resolve({ success: true, message: 'Password reset link sent to your email' });
            } else {
              resolve({
                success: false,
                message: 'Email not found. Please check your email address.',
              });
            }
          }, 1000);
        });

        if (response.success) {
          Alert.alert('Success', response.message);
          setEmail('');
        } else {
          Alert.alert('Error', response.message || 'Failed to send password reset link');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred during the password reset request');
      } finally {
        setLoading(false);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Reset Password" onPress={handleResetPassword} disabled={loading} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
    },
  });

  export default ForgotPasswordScreen;
