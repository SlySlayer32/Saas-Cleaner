import React from 'react';
    import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
    import { useNavigation } from '@react-navigation/native';

    interface Invoice {
      id: string;
      invoiceNumber: string;
      customerName: string;
      totalAmount: number;
      dueDate: Date;
    }

    interface InvoiceItemProps {
      invoice: Invoice;
    }

    const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
      const navigation = useNavigation();

      const handlePress = () => {
        navigation.navigate('InvoiceDetails', { invoiceId: invoice.id });
      };

      return (
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.container}>
            <View style={styles.topRow}>
              <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
              <Text style={styles.customerName}>{invoice.customerName}</Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.totalAmount}>${invoice.totalAmount.toFixed(2)}</Text>
              <Text style={styles.dueDate}>
                Due: {invoice.dueDate.toLocaleDateString('en-US')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      invoiceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2962ff', // Brand blue
      },
      customerName: {
        fontSize: 16,
      },
      bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      totalAmount: {
        fontSize: 14,
        color: '#333',
      },
      dueDate: {
        fontSize: 14,
        color: '#666',
      },
    });

    export default InvoiceItem;
