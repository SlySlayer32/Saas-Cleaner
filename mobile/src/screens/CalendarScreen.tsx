import React from 'react';
  import { View, StyleSheet } from 'react-native';
  import { CalendarView } from '../components/Appointments';

  const CalendarScreen = () => {
    return (
      <View style={styles.container}>
        <CalendarView />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });

  export default CalendarScreen;
