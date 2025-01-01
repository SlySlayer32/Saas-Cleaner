import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
    import InvoiceItem from './InvoiceItem';

    interface Invoice {
      id: string;
      invoiceNumber: string;
      customerName: string;
      totalAmount: number;
      dueDate: Date;
    }

    const InvoiceList = () => {
      const [invoices, setInvoices] = useState<Invoice[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [page, setPage] = useState<number>(1);
      const [hasMore, setHasMore] = useState<boolean>(true);

      // Placeholder function to simulate fetching invoices from an API
      const fetchInvoices = async (page: number, limit: number): Promise<Invoice[]> => {
        console.log('Simulating fetching invoices from API, page:', page);
        return new Promise<Invoice[]>((resolve) => {
          setTimeout(() => {
            const allInvoices: Invoice[] = [
              {
                id: '1',
                invoiceNumber: 'INV-001',
                customerName: 'John Doe',
                totalAmount: 120.0,
                dueDate: new Date(2024, 2, 15),
              },
              {
                id: '2',
                invoiceNumber: 'INV-002',
                customerName: 'Jane Smith',
                totalAmount: 250.0,
                dueDate: new Date(2024, 2, 20),
              },
              {
                id: '3',
                invoiceNumber: 'INV-003',
                customerName: 'Acme Corp',
                totalAmount: 500.0,
                dueDate: new Date(2024, 2, 25),
              },
              {
                id: '4',
                invoiceNumber: 'INV-004',
                customerName: 'Bob Johnson',
                totalAmount: 175.0,
                dueDate: new Date(2024, 2, 28),
              },
              {
                id: '5',
                invoiceNumber: 'INV-005',
                customerName: 'Alice Williams',
                totalAmount: 320.0,
                dueDate: new Date(2024, 3, 5),
              },
              {
                id: '6',
                invoiceNumber: 'INV-006',
                customerName: 'Charlie Brown',
                totalAmount: 90.0,
                dueDate: new Date(2024, 3, 10),
              },
              {
                id: '7',
                invoiceNumber: 'INV-007',
                customerName: 'David Lee',
                totalAmount: 450.0,
                dueDate: new Date(2024, 3, 15),
              },
              {
                id: '8',
                invoiceNumber: 'INV-008',
                customerName: 'Emily Davis',
                totalAmount: 180.0,
                dueDate: new Date(2024, 3, 20),
              },
              {
                id: '9',
                invoiceNumber: 'INV-009',
                customerName: 'Frank Wilson',
                totalAmount: 600.0,
                dueDate: new Date(2024, 3, 25),
              },
              {
                id: '10',
                invoiceNumber: 'INV-010',
                customerName: 'Grace Miller',
                totalAmount: 210.0,
                dueDate: new Date(2024, 3, 30),
              },
              {
                id: '11',
                invoiceNumber: 'INV-011',
                customerName: 'Henry Taylor',
                totalAmount: 350.0,
                dueDate: new Date(2024, 4, 5),
              },
              {
                id: '12',
                invoiceNumber: 'INV-012',
                customerName: 'Isabella Anderson',
                totalAmount: 120.0,
                dueDate: new Date(2024, 4, 10),
              },
              {
                id: '13',
                invoiceNumber: 'INV-013',
                customerName: 'Jack Thomas',
                totalAmount: 700.0,
                dueDate: new Date(2024, 4, 15),
              },
              {
                id: '14',
                invoiceNumber: 'INV-014',
                customerName: 'Katie Martinez',
                totalAmount: 280.0,
                dueDate: new Date(2024, 4, 20),
              },
              {
                id: '15',
                invoiceNumber: 'INV-015',
                customerName: 'Liam Hernandez',
                totalAmount: 420.0,
                dueDate: new Date(2024, 4, 25),
              },
              {
                id: '16',
                invoiceNumber: 'INV-016',
                customerName: 'Mia Garcia',
                totalAmount: 150.0,
                dueDate: new Date(2024, 4, 30),
              },
              {
                id: '17',
                invoiceNumber: 'INV-017',
                customerName: 'Noah Rodriguez',
                totalAmount: 800.0,
                dueDate: new Date(2024, 5, 5),
              },
              {
                id: '18',
                invoiceNumber: 'INV-018',
                customerName: 'Olivia Lopez',
                totalAmount: 300.0,
                dueDate: new Date(2024, 5, 10),
              },
              {
                id: '19',
                invoiceNumber: 'INV-019',
                customerName: 'Peter Hill',
                totalAmount: 550.0,
                dueDate: new Date(2024, 5, 15),
              },
              {
                id: '20',
                invoiceNumber: 'INV-020',
                customerName: 'Quinn Adams',
                totalAmount: 190.0,
                dueDate: new Date(2024, 5, 20),
              },
              {
                id: '21',
                invoiceNumber: 'INV-021',
                customerName: 'Ryan Campbell',
                totalAmount: 400.0,
                dueDate: new Date(2024, 5, 25),
              },
              {
                id: '22',
                invoiceNumber: 'INV-022',
                customerName: 'Sophia Parker',
                totalAmount: 100.0,
                dueDate: new Date(2024, 5, 30),
              },
              {
                id: '23',
                invoiceNumber: 'INV-023',
                customerName: 'Thomas Evans',
                totalAmount: 650.0,
                dueDate: new Date(2024, 6, 5),
              },
              {
                id: '24',
                invoiceNumber: 'INV-024',
                customerName: 'Ursula Collins',
                totalAmount: 230.0,
                dueDate: new Date(2024, 6, 10),
              },
              {
                id: '25',
                invoiceNumber: 'INV-025',
                customerName: 'Vincent Edwards',
                totalAmount: 380.0,
                dueDate: new Date(2024, 6, 15),
              },
            ];

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedInvoices = allInvoices.slice(startIndex, endIndex);

            resolve(paginatedInvoices);
          }, 500);
        });
      };

      useEffect(() => {
        const loadInvoices = async () => {
          try {
            const fetchedInvoices = await fetchInvoices(page, 20);
            if (fetchedInvoices.length === 0) {
              setHasMore(false);
            }
            if (page === 1) {
              setInvoices(fetchedInvoices);
            } else {
              setInvoices((prevInvoices) => [...prevInvoices, ...fetchedInvoices]);
            }
          } catch (err) {
            setError('Failed to fetch invoices');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };

        if (hasMore) {
          loadInvoices();
        }
      }, [page]);

      const loadMore = () => {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      };

      const renderFooter = () => {
        if (!loading) return null;
        return (
          <View style={styles.footer}>
            <ActivityIndicator animating size="large" color="#2962ff" />
          </View>
        );
      };

      return (
        <View style={styles.container}>
          {error && <Text style={styles.error}>{error}</Text>}
          <FlatList
            data={invoices}
            renderItem={({ item }) => <InvoiceItem invoice={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
      },
      error: {
        color: 'red',
        margin: 10,
      },
      footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#ced0ce',
      },
    });

    export default InvoiceList;
