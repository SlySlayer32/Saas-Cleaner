import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import InvoiceList from '../components/Invoices/InvoiceList';

    const InvoicesScreen = () => {
      return (
        <View style={styles.container}>
          <InvoiceList />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    });

    export default InvoicesScreen;
