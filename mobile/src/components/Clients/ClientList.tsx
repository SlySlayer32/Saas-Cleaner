import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
    import ClientForm from './ClientForm';

    interface Client {
      id: string;
      name: string;
      email: string;
      phone?: string;
    }

    const ClientList = ({ navigation }: { navigation: any }) => {
      const [clients, setClients] = useState<Client[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [showForm, setShowForm] = useState(false);
      const [selectedClient, setSelectedClient] = useState<Client | null>(null);

      // Placeholder function to simulate fetching clients from an API
      const fetchClients = async () => {
        // In a real scenario, you would fetch data from the API here
        console.log('Simulating fetching clients from API');
        return new Promise<Client[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' },
              { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
            ]);
          }, 500);
        });
      };

      useEffect(() => {
        const getClients = async () => {
          try {
            const fetchedClients = await fetchClients();
            setClients(fetchedClients);
          } catch (err) {
            setError('Failed to fetch clients');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };

        getClients();
      }, []);

      const handleAddClient = async (clientData: Omit<Client, 'id'>) => {
        // Placeholder for adding a client
        console.log('Simulating adding a client:', clientData);
        const newClient = { id: String(clients.length + 1), ...clientData };
        setClients([...clients, newClient]);
        setShowForm(false);
      };

      const handleEditClient = (client: Client) => {
        setSelectedClient(client);
        setShowForm(true);
      };

      const handleUpdateClient = async (clientData: Client) => {
        // Placeholder for updating a client
        console.log('Simulating updating a client:', clientData);
        const updatedClients = clients.map((c) => (c.id === clientData.id ? clientData : c));
        setClients(updatedClients);
        setShowForm(false);
        setSelectedClient(null);
      };

      const handleDeleteClient = async (clientId: string) => {
        // Placeholder for deleting a client
        console.log('Simulating deleting a client:', clientId);
        const updatedClients = clients.filter((c) => c.id !== clientId);
        setClients(updatedClients);
      };

      const renderItem = ({ item }: { item: Client }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.email}</Text>
          {item.phone && <Text style={styles.itemText}>{item.phone}</Text>}
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => handleEditClient(item)} />
            <Button
              title="Delete"
              onPress={() =>
                Alert.alert('Confirm Delete', 'Are you sure you want to delete this client?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: () => handleDeleteClient(item.id), style: 'destructive' },
                ])
              }
            />
          </View>
        </View>
      );

      return (
        <View style={styles.container}>
          {loading && <Text>Loading clients...</Text>}
          {error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && (
            <>
              <Button title="Add Client" onPress={() => setShowForm(true)} />
              <FlatList
                data={clients}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </>
          )}
          {showForm && (
            <ClientForm
              onSubmit={selectedClient ? handleUpdateClient : handleAddClient}
              initialData={selectedClient}
              onClose={() => {
                setShowForm(false);
                setSelectedClient(null);
              }}
            />
          )}
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
      item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      itemText: {
        fontSize: 16,
      },
      error: {
        color: 'red',
        marginBottom: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
      },
    });

    export default ClientList;
