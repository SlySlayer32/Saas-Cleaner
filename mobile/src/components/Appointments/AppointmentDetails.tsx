import React, { useState, useEffect } from 'react';
  import { View, Text, Button, StyleSheet, Alert } from 'react-native';
  import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

  interface Appointment {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    teamMemberId: string;
  }

  type RootStackParamList = {
    AppointmentDetails: { appointmentId: string };
    AppointmentForm: { appointment?: Appointment };
    // ... other screens
  };

  type AppointmentDetailsRouteProp = RouteProp<RootStackParamList, 'AppointmentDetails'>;

  const AppointmentDetails = () => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation();
    const route = useRoute<AppointmentDetailsRouteProp>();
    const { appointmentId } = route.params;

    // Placeholder function to simulate fetching an appointment from an API
    const fetchAppointment = async (id: string): Promise<Appointment> => {
      console.log('Simulating fetching appointment from API:', id);
      return new Promise<Appointment>((resolve, reject) => {
        setTimeout(() => {
          // Simulate fetching appointment data
          const appointments: Appointment[] = [
            {
              id: '1',
              title: 'Appointment 1',
              start: new Date(2024, 2, 10, 10, 0),
              end: new Date(2024, 2, 10, 11, 0),
              description: 'Meeting with John',
              teamMemberId: 'tm1',
            },
            {
              id: '2',
              title: 'Appointment 2',
              start: new Date(2024, 2, 12, 14, 0),
              end: new Date(2024, 2, 12, 15, 30),
              description: 'Project discussion',
              teamMemberId: 'tm2',
            },
            {
              id: '3',
              title: 'Appointment 3',
              start: new Date(2024, 2, 15, 9, 0),
              end: new Date(2024, 2, 15, 10, 0),
              description: 'Client presentation',
              teamMemberId: 'tm1',
            },
          ];

          const foundAppointment = appointments.find((a) => a.id === id);
          if (foundAppointment) {
            resolve(foundAppointment);
          } else {
            reject('Appointment not found');
          }
        }, 500);
      });
    };

    useEffect(() => {
      const getAppointment = async () => {
        try {
          const fetchedAppointment = await fetchAppointment(appointmentId);
          setAppointment(fetchedAppointment);
        } catch (err) {
          setError(err as string);
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      getAppointment();
    }, [appointmentId]);

    const handleEdit = () => {
      if (appointment) {
        // In a real app, you would navigate to the AppointmentForm screen with the appointment data
        console.log('Navigating to edit appointment screen:', appointment);
        navigation.navigate('AppointmentForm', { appointment });
      }
    };

    const handleDelete = async () => {
      // Placeholder for deleting an appointment
      console.log('Simulating deleting appointment:', appointmentId);
      Alert.alert('Success', 'Appointment deleted (simulated)');
      navigation.goBack();
    };

    if (loading) {
      return <Text>Loading appointment details...</Text>;
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (!appointment) {
      return <Text>Appointment not found</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{appointment.title}</Text>
        <Text>Start: {appointment.start.toLocaleString()}</Text>
        <Text>End: {appointment.end.toLocaleString()}</Text>
        <Text>Description: {appointment.description}</Text>
        <Text>Team Member ID: {appointment.teamMemberId}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={handleEdit} />
          <Button
            title="Delete"
            color="red"
            onPress={() =>
              Alert.alert('Confirm Delete', 'Are you sure you want to delete this appointment?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: handleDelete, style: 'destructive' },
              ])
            }
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
  });

  export default AppointmentDetails;
