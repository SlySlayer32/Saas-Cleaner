import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

    interface ClientFormData {
      id?: string;
      name: string;
      email: string;
      phone?: string;
    }

    interface ClientFormProps {
      onSubmit: (data: ClientFormData) => void;
      onClose: () => void;
      initialData?: ClientFormData | null;
    }

    const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose, initialData }) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');

      useEffect(() => {
        if (initialData) {
          setName(initialData.name);
          setEmail(initialData.email);
          setPhone(initialData.phone || '');
        }
      }, [initialData]);

      const handleSubmit = () => {
        if (!name || !email) {
          Alert.alert('Error', 'Name and email are required');
          return;
        }

        if (!validateEmail(email)) {
          Alert.alert('Error', 'Invalid email format');
          return;
        }

        onSubmit({
          id: initialData?.id,
          name,
          email,
          phone,
        });
      };

      const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };

      return (
        <View style={styles.container}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone (optional):</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

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
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
    });

    export default ClientForm;
