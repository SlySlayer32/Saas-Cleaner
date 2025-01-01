import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { ClientList } from '../components/Clients';

    const ClientsScreen = () => {
      return (
        <View style={styles.container}>
          <ClientList />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
    });

    export default ClientsScreen;
