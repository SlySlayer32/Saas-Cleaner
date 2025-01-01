import React from 'react';
  import { StyleSheet, useColorScheme } from 'react-native';
  import { Colors } from 'react-native/Libraries/NewAppScreen';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import {
    HomeScreen,
    LoginScreen,
    RegistrationScreen,
    ClientsScreen,
    AppointmentsScreen,
    AppointmentDetailsScreen,
    AppointmentFormScreen,
    CalendarScreen,
    InvoicesScreen,
    InvoiceDetailsScreen,
    ForgotPasswordScreen,
    TeamMembersScreen
  } from './src/screens';

  const Stack = createNativeStackNavigator();

  function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Clients" component={ClientsScreen} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} />
          <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
          <Stack.Screen name="AppointmentForm" component={AppointmentFormScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Invoices" component={InvoicesScreen} />
          <Stack.Screen name="InvoiceDetails" component={InvoiceDetailsScreen} />
          <Stack.Screen name="TeamMembers" component={TeamMembersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export default App;
