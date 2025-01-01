import React from 'react';
    import { View, Button, Alert } from 'react-native';

    // Placeholder function for local storage
    const removeItem = async (key: string): Promise<void> => {
      console.log(`Simulating local storage: Removing ${key}`);
      // In a real app, use AsyncStorage:
      // await AsyncStorage.removeItem(key);
    };

    const Logout = () => {
      const handleLogout = async () => {
        try {
          // Optional: Send a request to invalidate the token on the server
          // await fetch('/api/logout', { method: 'POST' });

          await removeItem('token');
          Alert.alert('Success', 'Logged out successfully');
          // In a real app, you would navigate to the login page here
          console.log('Simulating navigation to login page');
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred during logout');
        }
      };

      return (
        <View>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      );
    };

    export default Logout;
