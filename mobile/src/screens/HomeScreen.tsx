import React from 'react';
    import { View, Text, Button, StyleSheet } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { Logout } from '../components/Auth';

    const HomeScreen = () => {
      const navigation = useNavigation();

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Home Screen</Text>
          <Button title="Go to Clients" onPress={() => navigation.navigate('Clients')} />
          <Button
            title="Go to Appointments"
            onPress={() => navigation.navigate('Appointments')}
          />
          <Button title="Go to Calendar" onPress={() => navigation.navigate('Calendar')} />
          <Logout />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      text: {
        fontSize: 20,
        marginBottom: 20,
      },
    });

    export default HomeScreen;
