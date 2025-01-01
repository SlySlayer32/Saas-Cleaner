import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet } from 'react-native';
  import { useRoute, RouteProp } from '@react-navigation/native';

  type RootStackParamList = {
    InvoiceDetails: { invoiceId: string };
    // ... other screens
  };

  type InvoiceDetailsRouteProp = RouteProp<RootStackParamList, 'InvoiceDetails'>;

  interface Invoice {
    id: string;
    invoiceNumber: string;
    customerName: string;
    totalAmount: number;
    dueDate: Date;
    items: InvoiceItem[];
    status: string;
    issueDate: Date;
    paymentTerms: string;
    notes?: string;
  }

  interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
  }

  const InvoiceDetailsScreen = () => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const route = useRoute<InvoiceDetailsRouteProp>();
    const { invoiceId } = route.params;

    // Placeholder function to simulate fetching a single invoice from an API
    const fetchInvoice = async (id: string): Promise<Invoice> => {
      console.log('Simulating fetching invoice from API:', id);
      return new Promise<Invoice>((resolve, reject) => {
        setTimeout(() => {
          // Simulate fetching invoice data
          const invoices: Invoice[] = [
            {
              id: '1',
              invoiceNumber: 'INV-001',
              customerName: 'John Doe',
              totalAmount: 120.0,
              dueDate: new Date(2024, 2, 15),
              items: [
                { description: 'Service A', quantity: 1, unitPrice: 100.0 },
                { description: 'Service B', quantity: 2, unitPrice: 10.0 },
              ],
              status: 'Pending',
              issueDate: new Date(2024, 2, 1),
              paymentTerms: 'Net 30',
              notes: 'Thank you for your business.',
            },
            {
              id: '2',
              invoiceNumber: 'INV-002',
              customerName: 'Jane Smith',
              totalAmount: 250.0,
              dueDate: new Date(2024, 2, 20),
              items: [
                { description: 'Product X', quantity: 5, unitPrice: 50.0 },
              ],
              status: 'Paid',
              issueDate: new Date(2024, 2, 5),
              paymentTerms: 'Due on receipt',
            },
            // ... add more sample invoices as needed
          ];

          const foundInvoice = invoices.find((inv) => inv.id === id);
          if (foundInvoice) {
            resolve(foundInvoice);
          } else {
            reject('Invoice not found');
          }
        }, 500);
      });
    };

    useEffect(() => {
      const getInvoice = async () => {
        try {
          const fetchedInvoice = await fetchInvoice(invoiceId);
          setInvoice(fetchedInvoice);
        } catch (err) {
          setError(err as string);
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      getInvoice();
    }, [invoiceId]);

    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading invoice details...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
        </View>
      );
    }

    if (!invoice) {
      return (
        <View style={styles.container}>
          <Text>Invoice not found</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Invoice Details</Text>
        <Text style={styles.label}>Invoice Number:</Text>
        <Text style={styles.value}>{invoice.invoiceNumber}</Text>

        <Text style={styles.label}>Customer Name:</Text>
        <Text style={styles.value}>{invoice.customerName}</Text>

        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>${invoice.totalAmount.toFixed(2)}</Text>

        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{invoice.dueDate.toLocaleDateString()}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{invoice.status}</Text>

        <Text style={styles.label}>Issue Date:</Text>
        <Text style={styles.value}>{invoice.issueDate.toLocaleDateString()}</Text>

        <Text style={styles.label}>Payment Terms:</Text>
        <Text style={styles.value}>{invoice.paymentTerms}</Text>

        {invoice.notes && (
          <>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{invoice.notes}</Text>
          </>
        )}

        <Text style={styles.label}>Items:</Text>
        {invoice.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>
              {item.description} (Qty: {item.quantity}) - ${item.unitPrice.toFixed(2)} each
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#2962ff', // Brand blue
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    value: {
      fontSize: 16,
      marginBottom: 10,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      fontSize: 14,
    },
    error: {
      color: 'red',
      margin: 10,
    },
  });

  export default InvoiceDetailsScreen;
