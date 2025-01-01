import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { Picker } from '@react-native-picker/picker';

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

    const AppointmentList = () => {
      const [appointments, setAppointments] = useState<Appointment[]>([]);
      const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
      const [clients, setClients] = useState<Client[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [startDateFilter, setStartDateFilter] = useState<string>('');
      const [endDateFilter, setEndDateFilter] = useState<string>('');
      const [selectedTeamMemberFilter, setSelectedTeamMemberFilter] = useState<string>('');
      const [selectedClientFilter, setSelectedClientFilter] = useState<string>('');
      const [currentPage, setCurrentPage] = useState<number>(1);
      const [itemsPerPage, setItemsPerPage] = useState<number>(10);

      const navigation = useNavigation();

      // Placeholder functions for API interactions
      const fetchAppointments = async (
        page: number,
        limit: number,
        startDate?: string,
        endDate?: string,
        teamMemberId?: string,
        clientId?: string
      ): Promise<Appointment[]> => {
        console.log('Simulating fetching appointments from API with filters:', {
          page,
          limit,
          startDate,
          endDate,
          teamMemberId,
          clientId
        });

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
                clientId: 'c1'
              },
              {
                id: '2',
                title: 'Appointment 2',
                start: new Date(2024, 2, 12, 14, 0),
                end: new Date(2024, 2, 12, 15, 30),
                description: 'Project discussion',
                teamMemberId: 'tm2',
                clientId: 'c2'
              },
              {
                id: '3',
                title: 'Appointment 3',
                start: new Date(2024, 2, 15, 9, 0),
                end: new Date(2024, 2, 15, 10, 0),
                description: 'Client presentation',
                teamMemberId: 'tm1',
                clientId: 'c3'
              },
            ];

            let filteredAppointments = allAppointments;

            if (startDate) {
              const start = new Date(startDate);
              filteredAppointments = filteredAppointments.filter(
                (a) => a.start >= start
              );
            }

            if (endDate) {
              const end = new Date(endDate);
              filteredAppointments = filteredAppointments.filter((a) => a.end <= end);
            }

            if (teamMemberId) {
              filteredAppointments = filteredAppointments.filter(
                (a) => a.teamMemberId === teamMemberId
              );
            }

            if (clientId) {
              filteredAppointments = filteredAppointments.filter(
                (a) => a.clientId === clientId
              );
            }

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);

            resolve(paginatedAppointments);
          }, 500);
        });
      };

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

      useEffect(() => {
        const loadData = async () => {
          try {
            const fetchedAppointments = await fetchAppointments(
              currentPage,
              itemsPerPage,
              startDateFilter,
              endDateFilter,
              selectedTeamMemberFilter,
              selectedClientFilter
            );
            const fetchedTeamMembers = await fetchTeamMembers();
            const fetchedClients = await fetchClients();
            setAppointments(fetchedAppointments);
            setTeamMembers(fetchedTeamMembers);
            setClients(fetchedClients);
          } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };

        loadData();
      }, [currentPage, itemsPerPage, startDateFilter, endDateFilter, selectedTeamMemberFilter, selectedClientFilter]);

      const handleViewDetails = (appointmentId: string) => {
        navigation.navigate('AppointmentDetails', { appointmentId });
      };

      const handleAddAppointment = () => {
        navigation.navigate('AppointmentForm');
      };

      const handleFilter = () => {
        setCurrentPage(1); // Reset to the first page when filters change
        // Fetch appointments with new filters is handled in useEffect
      };

      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
      };

      const renderItem = ({ item }: { item: Appointment }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={styles.itemText}>
            {item.start.toLocaleString()} - {item.end.toLocaleString()}
          </Text>
          <Button title="View Details" onPress={() => handleViewDetails(item.id)} />
        </View>
      );

      return (
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              value={startDateFilter}
              onChangeText={setStartDateFilter}
            />
            <TextInput
              style={styles.input}
              placeholder="End Date (YYYY-MM-DD)"
              value={endDateFilter}
              onChangeText={setEndDateFilter}
            />
            <Picker
              style={styles.picker}
              selectedValue={selectedTeamMemberFilter}
              onValueChange={(itemValue) => setSelectedTeamMemberFilter(itemValue)}
            >
              <Picker.Item label="All Team Members" value="" />
              {teamMembers.map((member) => (
                <Picker.Item key={member.id} label={member.name} value={member.id} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={selectedClientFilter}
              onValueChange={(itemValue) => setSelectedClientFilter(itemValue)}
            >
              <Picker.Item label="All Clients" value="" />
              {clients.map((client) => (
                <Picker.Item key={client.id} label={client.name} value={client.id} />
              ))}
            </Picker>
            <Button title="Filter" onPress={handleFilter} />
          </View>

          {loading && <Text>Loading appointments...</Text>}
          {error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && (
            <>
              <Button title="Add Appointment" onPress={handleAddAppointment} />
              <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                  <View style={styles.paginationContainer}>
                    <Button
                      title="Previous"
                      onPress={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    <Text style={styles.pageNumber}>{currentPage}</Text>
                    <Button
                      title="Next"
                      onPress={() => handlePageChange(currentPage + 1)}
                      disabled={appointments.length < itemsPerPage}
                    />
                  </View>
                }
              />
            </>
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
      filterContainer: {
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
      },
      picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
      },
      paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      pageNumber: {
        marginHorizontal: 10,
        fontSize: 16,
      },
    });

    export default AppointmentList;
