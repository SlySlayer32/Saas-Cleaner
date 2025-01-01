import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, Button, Alert, StyleSheet, Switch } from 'react-native';
    import { Picker } from '@react-native-picker/picker';

    interface TeamMemberFormData {
      id?: string;
      name: string;
      role: string;
      availability: boolean;
    }

    interface TeamMemberFormProps {
      onSubmit: (data: TeamMemberFormData) => void;
      onClose: () => void;
      initialData?: TeamMemberFormData | null;
    }

    const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ onSubmit, onClose, initialData }) => {
      const [name, setName] = useState('');
      const [role, setRole] = useState('');
      const [availability, setAvailability] = useState(true);

      useEffect(() => {
        if (initialData) {
          setName(initialData.name);
          setRole(initialData.role);
          setAvailability(initialData.availability);
        }
      }, [initialData]);

      const handleSubmit = () => {
        if (!name || !role) {
          Alert.alert('Error', 'Name and role are required');
          return;
        }

        onSubmit({
          id: initialData?.id,
          name,
          role,
          availability,
        });
      };

      return (
        <View style={styles.container}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Role:</Text>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Developer" value="Developer" />
            <Picker.Item label="Designer" value="Designer" />
            <Picker.Item label="Manager" value="Manager" />
            {/* Add more roles as needed */}
          </Picker>

          <View style={styles.availabilityContainer}>
            <Text style={styles.label}>Availability:</Text>
            <Switch value={availability} onValueChange={setAvailability} />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        margin: 10,
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
        backgroundColor: 'white',
      },
      picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white',
      },
      availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
    });

    export default TeamMemberForm;
