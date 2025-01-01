import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { Registration } from '../components/Auth';

    const RegistrationScreen = () => {
      return (
        <View style={styles.container}>
          <Registration />
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

    export default RegistrationScreen;
