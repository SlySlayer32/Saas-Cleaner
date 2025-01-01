import React, { useState } from 'react';
  import { View, StyleSheet, Button } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { AppointmentList, CalendarView } from '../components/Appointments';

  const AppointmentsScreen = () => {
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="List View"
            onPress={() => setViewMode('list')}
            color={viewMode === 'list' ? '#2962ff' : undefined}
          />
          <Button
            title="Calendar View"
            onPress={() => setViewMode('calendar')}
            color={viewMode === 'calendar' ? '#2962ff' : undefined}
          />
        </View>
        {viewMode === 'list' && <AppointmentList />}
        {viewMode === 'calendar' && <CalendarView />}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
  });

  export default AppointmentsScreen;
