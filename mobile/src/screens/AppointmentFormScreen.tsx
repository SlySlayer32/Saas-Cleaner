import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { AppointmentForm } from '../components/Appointments';

    const AppointmentFormScreen = () => {
      return (
        <View style={styles.container}>
          <AppointmentForm />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
    });

    export default AppointmentFormScreen;
