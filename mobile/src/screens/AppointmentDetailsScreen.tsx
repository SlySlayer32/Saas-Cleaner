import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { AppointmentDetails } from '../components/Appointments';

    const AppointmentDetailsScreen = () => {
      return (
        <View style={styles.container}>
          <AppointmentDetails />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
    });

    export default AppointmentDetailsScreen;
