import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
  import Calendar from 'react-calendar';
  import 'react-calendar/dist/Calendar.css';
  import { useNavigation } from '@react-navigation/native';

  interface Appointment {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    teamMemberId: string;
  }

  const CalendarView = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const navigation = useNavigation();

    // Placeholder function to simulate fetching appointments from an API
    const fetchAppointments = async (date: Date): Promise<Appointment[]> => {
      console.log('Simulating fetching appointments for date:', date);
      return new Promise<Appointment[]>((resolve) => {
        setTimeout(() => {
          const allAppointments: Appointment[] = [
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

          const filteredAppointments = allAppointments.filter((appointment) => {
            return (
              appointment.start.getDate() === date.getDate() &&
              appointment.start.getMonth() === date.getMonth() &&
              appointment.start.getFullYear() === date.getFullYear()
            );
          });

          resolve(filteredAppointments);
        }, 500);
      });
    };

    useEffect(() => {
      const loadAppointments = async () => {
        try {
          const fetchedAppointments = await fetchAppointments(selectedDate);
          setAppointments(fetchedAppointments);
        } catch (error) {
          console.error('Failed to fetch appointments:', error);
          Alert.alert('Error', 'Failed to fetch appointments');
        }
      };

      loadAppointments();
    }, [selectedDate]);

    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
    };

    const handleAppointmentPress = (appointmentId: string) => {
      console.log('Navigating to details for appointment:', appointmentId);
      navigation.navigate('AppointmentDetails', { appointmentId });
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
      if (view === 'month') {
        const dayAppointments = appointments.filter((appointment) => {
          return (
            appointment.start.getDate() === date.getDate() &&
            appointment.start.getMonth() === date.getMonth() &&
            appointment.start.getFullYear() === date.getFullYear()
          );
        });

        if (dayAppointments.length > 0) {
          return (
            <View style={styles.appointmentDot} />
          );
        }
      }
      return null;
    };

    return (
      <View style={styles.container}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
        <View style={styles.appointmentsContainer}>
          <Text style={styles.appointmentsHeader}>
            Appointments for {selectedDate.toDateString()}
          </Text>
          {appointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              onPress={() => handleAppointmentPress(appointment.id)}
            >
              <View style={styles.appointmentItem}>
                <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                <Text>
                  {appointment.start.toLocaleTimeString()} -{' '}
                  {appointment.end.toLocaleTimeString()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    appointmentsContainer: {
      marginTop: 20,
    },
    appointmentsHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    appointmentItem: {
      backgroundColor: '#e0e0e0',
      padding: 10,
      marginBottom: 5,
      borderRadius: 5,
    },
    appointmentTitle: {
      fontWeight: 'bold',
    },
    appointmentDot: {
      height: 8,
      width: 8,
      backgroundColor: 'blue',
      borderRadius: 4,
      margin: 2,
    },
  });

  export default CalendarView;
