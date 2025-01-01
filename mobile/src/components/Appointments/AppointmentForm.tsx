import React, { useState, useEffect } from 'react';
  import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
  import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
  import { Picker } from '@react-native-picker/picker';
  import DateTimePicker from '@react-native-community/datetimepicker';

  interface Appointment {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    teamMemberId: string;
    clientId: string;
  }

  interface TeamMember {
    id: string;
    name: string;
  }

  interface Client {
    id: string;
    name: string;
  }

  type RootStackParamList = {
    AppointmentDetails: { appointmentId: string };
    AppointmentForm: { appointment?: Appointment };
    // ... other screens
  };

  type AppointmentFormRouteProp = RouteProp<RootStackParamList, 'AppointmentForm'>;

  const AppointmentForm = () => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [description, setDescription] = useState('');
    const [teamMemberId, setTeamMemberId] = useState('');
    const [clientId, setClientId] = useState('');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const navigation = useNavigation();
    const route = useRoute<AppointmentFormRouteProp>();
    const { appointment: initialAppointment } = route.params || {};

    // Placeholder functions for API interactions
    const fetchTeamMembers = async (): Promise<TeamMember[]> => {
      console.log('Simulating fetching team members from API');
      return new Promise<TeamMember[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 'tm1', name: 'John Doe' },
            { id: 'tm2', name: 'Jane Smith' },
          ]);
        }, 500);
      });
    };

    const fetchClients = async (): Promise<Client[]> => {
      console.log('Simulating fetching clients from API');
      return new Promise<Client[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 'c1', name: 'Alice Johnson' },
            { id: 'c2', name: 'Bob Williams' },
            { id: 'c3', name: 'Charlie Brown' },
          ]);
        }, 500);
      });
    };

    const createAppointment = async (newAppointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
      console.log('Simulating creating appointment:', newAppointment);
      return new Promise<Appointment>((resolve) => {
        setTimeout(() => {
          // Simulate creating a new appointment with an ID
          const createdAppointment = {
            id: String(Math.random()),
            ...newAppointment,
          };
          resolve(createdAppointment);
        }, 500);
      });
    };

    const updateAppointment = async (updatedAppointment: Appointment): Promise<Appointment> => {
      console.log('Simulating updating appointment:', updatedAppointment);
      return new Promise<Appointment>((resolve) => {
        setTimeout(() => {
          resolve(updatedAppointment);
        }, 500);
      });
    };

    useEffect(() => {
      const loadData = async () => {
        try {
          const fetchedTeamMembers = await fetchTeamMembers();
          const fetchedClients = await fetchClients();
          setTeamMembers(fetchedTeamMembers);
          setClients(fetchedClients);
        } catch (error) {
          console.error('Failed to fetch data:', error);
          Alert.alert('Error', 'Failed to fetch team members or clients');
        }
      };

      loadData();

      if (initialAppointment) {
        setTitle(initialAppointment.title);
        setStart(initialAppointment.start);
        setEnd(initialAppointment.end);
        setDescription(initialAppointment.description);
        setTeamMemberId(initialAppointment.teamMemberId);
        setClientId(initialAppointment.clientId);
      }
    }, [initialAppointment]);

    const handleSubmit = async () => {
      if (!title || !start || !end || !description || !teamMemberId || !clientId) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      if (end <= start) {
        Alert.alert('Error', 'End time must be after start time');
        return;
      }

      const appointmentData: Omit<Appointment, 'id'> = {
        title,
        start,
        end,
        description,
        teamMemberId,
        clientId
      };

      try {
        if (initialAppointment) {
          const updatedAppointment = await updateAppointment({
            ...appointmentData,
            id: initialAppointment.id,
          });
          Alert.alert('Success', 'Appointment updated');
          navigation.navigate('AppointmentDetails', { appointmentId: updatedAppointment.id });
        } else {
          const newAppointment = await createAppointment(appointmentData);
          Alert.alert('Success', 'Appointment created');
          navigation.navigate('AppointmentDetails', { appointmentId: newAppointment.id });
        }
      } catch (error) {
        console.error('Failed to save appointment:', error);
        Alert.alert('Error', 'Failed to save appointment');
      }
    };

    const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
      setShowStartDatePicker(false);
      if (selectedDate) {
        setStart(selectedDate);
      }
    };

    const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
      setShowEndDatePicker(false);
      if (selectedDate) {
        setEnd(selectedDate);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Title:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Start Time:</Text>
        <Button title="Select Start Time" onPress={() => setShowStartDatePicker(true)} />
        {showStartDatePicker && (
          <DateTimePicker
            value={start}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onStartDateChange}
          />
        )}
        <Text>{start.toLocaleString()}</Text>

        <Text style={styles.label}>End Time:</Text>
        <Button title="Select End Time" onPress={() => setShowEndDatePicker(true)} />
        {showEndDatePicker && (
          <DateTimePicker
            value={end}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onEndDateChange}
          />
        )}
        <Text>{end.toLocaleString()}</Text>

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Team Member:</Text>
        <Picker
          selectedValue={teamMemberId}
          onValueChange={(itemValue) => setTeamMemberId(itemValue)}
        >
          <Picker.Item label="Select Team Member" value="" />
          {teamMembers.map((member) => (
            <Picker.Item key={member.id} label={member.name} value={member.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Client:</Text>
        <Picker
          selectedValue={clientId}
          onValueChange={(itemValue) => setClientId(itemValue)}
        >
          <Picker.Item label="Select Client" value="" />
          {clients.map((client) => (
            <Picker.Item key={client.id} label={client.name} value={client.id} />
          ))}
        </Picker>

        <Button title="Save" onPress={handleSubmit} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
  });

  export default AppointmentForm;
