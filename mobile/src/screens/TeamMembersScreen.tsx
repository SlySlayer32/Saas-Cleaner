import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { TeamMemberList } from '../components/TeamMembers';

    const TeamMembersScreen = () => {
      return (
        <View style={styles.container}>
          <TeamMemberList />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
    });

    export default TeamMembersScreen;
