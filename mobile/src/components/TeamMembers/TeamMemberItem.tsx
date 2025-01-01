import React from 'react';
    import { View, Text, Button, StyleSheet, Alert } from 'react-native';

    interface TeamMember {
      id: string;
      name: string;
      role: string;
      availability: boolean;
    }

    interface TeamMemberItemProps {
      teamMember: TeamMember;
      onEdit: (teamMember: TeamMember) => void;
      onDelete: (teamMemberId: string) => void;
    }

    const TeamMemberItem: React.FC<TeamMemberItemProps> = ({ teamMember, onEdit, onDelete }) => {
      return (
        <View style={styles.item}>
          <Text style={styles.name}>{teamMember.name}</Text>
          <Text>Role: {teamMember.role}</Text>
          <Text>Availability: {teamMember.availability ? 'Available' : 'Not Available'}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => onEdit(teamMember)} />
            <Button
              title="Delete"
              onPress={() =>
                Alert.alert('Confirm Delete', 'Are you sure you want to delete this team member?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: () => onDelete(teamMember.id), style: 'destructive' },
                ])
              }
            />
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
      },
    });

    export default TeamMemberItem;
