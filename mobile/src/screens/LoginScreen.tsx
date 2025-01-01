import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { Login } from '../components/Auth';

    const LoginScreen = () => {
      return (
        <View style={styles.container}>
          <Login />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
    });

    export default LoginScreen;
