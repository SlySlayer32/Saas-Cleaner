import React, { useState } from 'react';
  import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

  interface TransactionFormData {
    id?: string;
    description: string;
    amount: number;
    date: Date;
    type: 'income' | 'expense';
  }

  interface TransactionFormProps {
    onSubmit: (data: TransactionFormData) => void;
    onCancel: () => void;
    initialData?: TransactionFormData | null;
  }

  const TransactionForm: React.FC<TransactionFormProps> = ({
    onSubmit,
    onCancel,
    initialData,
  }) => {
    const [description, setDescription] = useState(initialData?.description || '');
    const [amount, setAmount] = useState(initialData?.amount ? String(initialData.amount) : '');
    const [date, setDate] = useState(initialData?.date || new Date());
    const [type, setType] = useState<"income" | "expense">(initialData?.type || 'expense');

    const handleSubmit = () => {
      if (!description || !amount) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        Alert.alert('Error', 'Please enter a valid amount');
        return;
      }

      onSubmit({
        id: initialData?.id,
        description,
        amount: amountNum,
        date,
        type
      });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />

        <Text style={styles.label}>Date:</Text>
        <Text>{date.toDateString()}</Text>

        <View style={styles.typeContainer}>
          <Button
            title="Expense"
            onPress={() => setType('expense')}
            color={type === 'expense' ? 'red' : 'gray'}
          />
          <Button
            title="Income"
            onPress={() => setType('income')}
            color={type === 'income' ? 'green' : 'gray'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={onCancel} color="gray" />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      margin: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: 'white',
    },
    typeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  export default TransactionForm;
