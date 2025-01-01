import { isValidEmail, isValidPassword } from '../../utils/validation';

  const simulateValidationTests = () => {
    console.log('Simulating Validation Utility Tests:');

    // Test isValidEmail
    const validEmails = ['test@example.com', 'user123@domain.co.uk'];
    const invalidEmails = ['test', 'test@', '@example.com', 'test@.com', 'test@example'];

    validEmails.forEach((email) => {
      if (isValidEmail(email)) {
        console.log(`  isValidEmail: ${email} - PASSED`);
      } else {
        console.error(`  isValidEmail: ${email} - FAILED`);
      }
    });

    invalidEmails.forEach((email) => {
      if (!isValidEmail(email)) {
        console.log(`  isValidEmail: ${email} - PASSED`);
      } else {
        console.error(`  isValidEmail: ${email} - FAILED`);
      }
    });

    // Test isValidPassword
    const validPasswords = ['Password123!', 'MyP@$$wOrd', 'StrongP@$$1'];
    const invalidPasswords = ['password', 'short', 'NoDigits!', 'NoSpecialChar1', 'nouppercase1!', 'NOLOWERCASE1!'];

    validPasswords.forEach((password) => {
      if (isValidPassword(password)) {
        console.log(`  isValidPassword: ${password} - PASSED`);
      } else {
        console.error(`  isValidPassword: ${password} - FAILED`);
      }
    });

    invalidPasswords.forEach((password) => {
      if (!isValidPassword(password)) {
        console.log(`  isValidPassword: ${password} - PASSED`);
      } else {
        console.error(`  isValidPassword: ${password} - FAILED`);
      }
    });

    console.log('Simulated Validation Utility Tests Completed.');
  };

  simulateValidationTests();
