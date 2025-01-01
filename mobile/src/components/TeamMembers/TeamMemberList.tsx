import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
    import TeamMemberItem from './TeamMemberItem';
    import TeamMemberForm from './TeamMemberForm';

    interface TeamMember {
      id: string;
      name: string;
      role: string;
      availability: boolean;
    }

    const TeamMemberList = () => {
      const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [showForm, setShowForm] = useState(false);
      const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);

      // Placeholder function to simulate fetching team members from an API
      const fetchTeamMembers = async (): Promise<TeamMember[]> => {
        console.log('Simulating fetching team members from API');
        return new Promise<TeamMember[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 'tm1', name: 'John Doe', role: 'Developer', availability: true },
              { id: 'tm2', name: 'Jane Smith', role: 'Designer', availability: false },
              { id: 'tm3', name: 'Bob Johnson', role: 'Manager', availability: true },
            ]);
          }, 500);
        });
      };

      useEffect(() => {
        const getTeamMembers = async () => {
          try {
            const fetchedTeamMembers = await fetchTeamMembers();
            setTeamMembers(fetchedTeamMembers);
          } catch (err) {
            setError('Failed to fetch team members');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };

        getTeamMembers();
      }, []);

      const handleAddTeamMember = async (teamMemberData: Omit<TeamMember, 'id'>) => {
        // Placeholder for adding a team member
        console.log('Simulating adding a team member:', teamMemberData);
        const newTeamMember = { id: String(teamMembers.length + 1), ...teamMemberData };
        setTeamMembers([...teamMembers, newTeamMember]);
        setShowForm(false);
      };

      const handleEditTeamMember = (teamMember: TeamMember) => {
        setSelectedTeamMember(teamMember);
        setShowForm(true);
      };

      const handleUpdateTeamMember = async (teamMemberData: TeamMember) => {
        // Placeholder for updating a team member
        console.log('Simulating updating a team member:', teamMemberData);
        const updatedTeamMembers = teamMembers.map((tm) =>
          tm.id === teamMemberData.id ? teamMemberData : tm
        );
        setTeamMembers(updatedTeamMembers);
        setShowForm(false);
        setSelectedTeamMember(null);
      };

      const handleDeleteTeamMember = async (teamMemberId: string) => {
        // Placeholder for deleting a team member
        console.log('Simulating deleting a team member:', teamMemberId);
        const updatedTeamMembers = teamMembers.filter((tm) => tm.id !== teamMemberId);
        setTeamMembers(updatedTeamMembers);
      };

      const renderItem = ({ item }: { item: TeamMember }) => (
        <TeamMemberItem
          teamMember={item}
          onEdit={handleEditTeamMember}
          onDelete={handleDeleteTeamMember}
        />
      );

      return (
        <View style={styles.container}>
          {loading && <Text>Loading team members...</Text>}
          {error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && (
            <>
              <Button title="Add Team Member" onPress={() => setShowForm(true)} />
              <FlatList
                data={teamMembers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </>
          )}
          {showForm && (
            <TeamMemberForm
              onSubmit={selectedTeamMember ? handleUpdateTeamMember : handleAddTeamMember}
              initialData={selectedTeamMember}
              onClose={() => {
                setShowForm(false);
                setSelectedTeamMember(null);
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
      error: {
        color: 'red',
        marginBottom: 10,
      },
    });

    export default TeamMemberList;
