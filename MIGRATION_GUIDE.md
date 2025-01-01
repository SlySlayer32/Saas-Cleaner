# Migration Guide: WebContainer to Local Development Environment

This guide provides step-by-step instructions for migrating the Cleaning Business SaaS project from the WebContainer environment to a local development environment.

## Introduction

The WebContainer environment is useful for rapid prototyping and development, but it has limitations compared to a local development setup. This guide helps you transition your project to a local environment, enabling you to use a real database, run comprehensive tests, and develop with the full power of your local machine.

**Key Differences:**

| Feature          | WebContainer                                 | Local Development Environment                                                                                                                                                           |
| ---------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Database**     | Simulated in-memory or placeholder functions | Real database (e.g., PostgreSQL) running locally or remotely                                                                                                                            |
| **Testing**      | Simulated tests, limited functionality      | Full testing capabilities with Jest, Detox, and other frameworks                                                                                                                         |
| **Dependencies** | Limited to browser-compatible packages      | Access to all Node.js packages and native modules                                                                                                                                        |
| **API Calls**    | Simulated with placeholder functions         | Real API calls to a backend server                                                                                                                                                      |
| **Navigation**   | Simulated                                    | Real navigation using React Navigation                                                                                                                                                  |
| **Expo CLI**     | Not fully supported                          | Full support for Expo CLI and React Native CLI                                                                                                                                           |
| **Debugging**    | Limited debugging tools                      | Full debugging capabilities with browser developer tools, Node.js debugger, and IDE integration                                                                                         |
| **Performance**  | Limited by browser performance               | Performance depends on your local machine's resources                                                                                                                                   |
| **File System**  | Virtualized file system                      | Access to your local file system                                                                                                                                                        |
| **Environment**  | Runs in the browser                          | Runs directly on your operating system (e.g., macOS, Windows, Linux) with access to system resources (e.g., file system, network, hardware) using tools like Node.js, Docker, and others |

## Backend Setup

### 1. Install Node.js and npm

If you don't have Node.js and npm installed, download and install the latest LTS version from the official website: [https://nodejs.org/](https://nodejs.org/)

Verify the installation by running:

```bash
node -v
npm -v
```

### 2. Install PostgreSQL

Install PostgreSQL on your local machine. You can download it from the official website or use a package manager like Homebrew (macOS) or apt (Debian/Ubuntu).

-   **Official Website:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
-   **Homebrew (macOS):** `brew install postgresql`
-   **apt (Debian/Ubuntu):** `sudo apt-get install postgresql`

Start the PostgreSQL server and create a database for your application.

### 3. Set up the Backend Project

1. Clone the project from the WebContainer environment to your local machine. You can do this by downloading the project as a zip file from WebContainer and extracting it.
2. Navigate to the backend directory (where the `package.json` file is located).
3. Install the backend dependencies:

    ```bash
    npm install
    ```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name
JWT_SECRET=your_jwt_secret
PORT=3000
```

Replace `user`, `password`, and `your_database_name` with your PostgreSQL credentials.

### 5. Implement Database Interactions

Replace the placeholder database functions in `src/controllers` with actual database interactions using a PostgreSQL client library like `pg`.

**Example (`src/utils/db.ts`):**

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
};

// Example usage in a controller:
// const users = await query('SELECT * FROM users');
```

Update your controllers (e.g., `userController.ts`, `clientController.ts`, `appointmentController.ts`, `invoiceController.ts`, `teamMemberController.ts`) to use the `query` function for database operations.

### 6. Run the Backend Server

Start the backend server:

```bash
npm run dev
```

The server should now be running and connected to your local PostgreSQL database.

## Frontend Setup (Mobile App)

### 1. Install React Native CLI and Expo CLI

If you don't have them already, install the React Native CLI and Expo CLI globally:

```bash
npm install -g react-native-cli expo-cli
```

### 2. Set up the Mobile Project

1. Navigate to the `mobile` directory in your project.
2. Install the dependencies:

    ```bash
    npm install
    ```

### 3. Configure the Environment

-   **API Base URL:** Update the base URL for API calls in your components to point to your local backend server (e.g., `http://localhost:3000`). You might want to use an environment variable for this.
-   **AsyncStorage:** Replace the placeholder `setItem` and `removeItem` functions in your components with actual `AsyncStorage` calls. Install `@react-native-async-storage/async-storage`:

    ```bash
    npx expo install @react-native-async-storage/async-storage
    ```

    Then, import and use it:

    ```typescript
    import AsyncStorage from '@react-native-async-storage/async-storage';

    // Example usage:
    await AsyncStorage.setItem('token', token);
    const token = await AsyncStorage.getItem('token');
    await AsyncStorage.removeItem('token');
    ```

### 4. Run the Mobile App

You can run the app using either Expo CLI or React Native CLI:

**Expo CLI:**

```bash
npx expo start
```

This will start the Expo development server. You can then open the app on a simulator/emulator or on a physical device using the Expo Go app.

**React Native CLI:**

```bash
npx react-native run-android
# or
npx react-native run-ios
```

This will build and run the app on a connected Android or iOS device/simulator.

## Testing

### 1. Unit Tests (Jest)

1. Install Jest and related dependencies:

    ```bash
    npm install --save-dev jest @testing-library/react-native react-test-renderer @types/jest babel-jest @react-native-community/async-storage
    ```

2. Configure Jest:
    Create a `jest.config.js` file in the `mobile` directory:

    ```js
    module.exports = {
      preset: 'react-native',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      setupFiles: ['./jest.setup.js'], // Create this file if needed for setup
      transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@react-native-async-storage/async-storage)',
      ],
    };
    ```

    Create a `jest.setup.js` file if you need to mock any modules or set up global test configurations. For example, to mock `AsyncStorage`, you can add:

    ```js
    jest.mock('@react-native-async-storage/async-storage', () => ({
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      // ... other AsyncStorage methods
    }));
    ```

3. Update `package.json`:
    Modify the `test` script in your `mobile/package.json`:

    ```json
    "scripts": {
      "test": "jest",
      "test:coverage": "jest --coverage"
    }
    ```

4. Rewrite the simulated unit tests in `src/tests/unit` using Jest and `@testing-library/react-native`.

    **Example (`TransactionForm.test.tsx`):**

    ```typescript
    import React from 'react';
    import { render, fireEvent, waitFor } from '@testing-library/react-native';
    import TransactionForm from '../../components/Transactions/TransactionForm';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    jest.mock('@react-native-async-storage/async-storage');

    describe('TransactionForm', () => {
      it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(
          <TransactionForm onSubmit={jest.fn()} onCancel={jest.fn()} />
        );

        expect(getByText('Description:')).toBeTruthy();
        expect(getByPlaceholderText('Enter description')).toBeTruthy();
        // ... other assertions
      });

      it('submits the form with valid data', async () => {
        const mockOnSubmit = jest.fn();
        const { getByText, getByPlaceholderText } = render(
          <TransactionForm onSubmit={mockOnSubmit} onCancel={jest.fn()} />
        );

        fireEvent.changeText(getByPlaceholderText('Enter description'), 'Test Transaction');
        fireEvent.changeText(getByPlaceholderText('Enter amount'), '100');
        fireEvent.press(getByText('Submit'));

        await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
        expect(mockOnSubmit).toHaveBeenCalledWith({
          description: 'Test Transaction',
          amount: 100,
          date: expect.any(Date),
          type: 'expense', // Assuming 'expense' is the default
        });
      });

      // ... other test cases for validation, error handling, etc.
    });
    ```

5. Run the unit tests:

    ```bash
    npm run test -- --verbose
    ```
    or
    ```bash
    npm run test:coverage
    ```

### 2. End-to-End Tests (Detox)

1. Install Detox CLI globally:

    ```bash
    npm install -g detox-cli
    ```

2. Install Detox and its dependencies in your `mobile` project:

    ```bash
    npm install --save-dev detox @types/jest jest-circus
    ```

3. Initialize Detox:

    ```bash
    detox init -r jest
    ```

    This will create a `detox.config.js` file and a `e2e` directory in your `mobile` project.

4. Configure Detox:
    Modify `detox.config.js` to configure your app's build and test settings. You'll need to specify the paths to your app's debug and release builds, as well as the simulator or device you want to use for testing.

    Example configuration for iOS:

    ```js
    module.exports = {
      "testRunner": {
        "args": {
          "$0": "jest",
          "config": "e2e/jest.config.js"
        },
        "jest": {
          "setupTimeout": 120000
        }
      },
      "apps": {
        "ios.debug": {
          "type": "ios.app",
          "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/YourApp.app",
          "build": "xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build"
        },
        "ios.release": {
          "type": "ios.app",
          "binaryPath": "ios/build/Build/Products/Release-iphonesimulator/YourApp.app",
          "build": "xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build"
        }
      },
      "devices": {
        "simulator": {
          "type": "ios.simulator",
          "device": {
            "type": "iPhone 14"
          }
        }
      },
      "configurations": {
        "ios.sim.debug": {
          "device": "simulator",
          "app": "ios.debug"
        },
        "ios.sim.release": {
          "device": "simulator",
          "app": "ios.release"
        }
      }
    };
    ```

    Replace `YourApp` with your app's name.

5. Create `e2e/jest.config.js`:

    ```js
    /** @type {import('@jest/types').Config.InitialOptions} */
    module.exports = {
      rootDir: '..',
      testTimeout: 120000,
      maxWorkers: 1,
      globalSetup: 'detox/runners/jest/globalSetup',
      globalTeardown: 'detox/runners/jest/globalTeardown',
      reporters: ['detox/runners/jest/reporter'],
      testEnvironment: 'detox/runners/jest/testEnvironment',
      verbose: true,
      testMatch: ['<rootDir>/e2e/**/*.test.ts', '<rootDir>/e2e/**/*.test.js'],
    };
    ```

6. Create `e2e/starter.test.ts` or `.js`

    ```js
    // import { device, expect, element, by } from 'detox';

    describe('Example', () => {
      beforeAll(async () => {
        // await device.launchApp();
      });

      beforeEach(async () => {
        // await device.reloadReactNative();
      });

      it('should have welcome screen', async () => {
        // await expect(element(by.id('welcome'))).toBeVisible();
      });

      it('should show hello screen after tap', async () => {
        // await element(by.id('hello_button')).tap();
        // await expect(element(by.text('Hello!!!'))).toBeVisible();
      });

      it('should show world screen after tap', async () => {
        // await element(by.id('world_button')).tap();
        // await expect(element(by.text('World!!!'))).toBeVisible();
      });
    });
    ```

7. Rewrite the simulated end-to-end tests in `src/tests/e2e` using Detox.

    **Example (`e2e/userFlows.test.ts`):**

    ```typescript
    import { device, expect, element, by } from 'detox';

    describe('User Flows', () => {
      beforeAll(async () => {
        await device.launchApp();
      });

      beforeEach(async () => {
        await device.reloadReactNative();
      });

      it('should register and login successfully', async () => {
        await expect(element(by.id('Login-screen'))).toBeVisible();
        await element(by.id('Login-register-button')).tap();

        await expect(element(by.id('Registration-screen'))).toBeVisible();
        await element(by.id('Registration-username-input')).typeText('testuser');
        await element(by.id('Registration-email-input')).typeText('test@example.com');
        await element(by.id('Registration-password-input')).typeText('Password123!');
        await element(by.id('Registration-confirm-password-input')).typeText('Password123!');
        await element(by.id('Registration-register-button')).tap();

        await expect(element(by.id('Login-screen'))).toBeVisible();
        await element(by.id('Login-email-input')).typeText('test@example.com');
        await element(by.id('Login-password-input')).typeText('Password123!');
        await element(by.id('Login-login-button')).tap();

        await expect(element(by.id('Home-screen'))).toBeVisible();
      });

      // ... other end-to-end test cases
    });
    ```

    **Note:** You'll need to add `testID` props to your components to make them easily selectable by Detox. For example:

    ```tsx
    <View testID="Login-screen">
      <TextInput testID="Login-email-input" placeholder="Email" />
      <Button testID="Login-login-button" title="Login" onPress={handleLogin} />
    </View>
    ```

8. Build and run the end-to-end tests:

    ```bash
    detox build -c ios.sim.debug # Build the app for testing (example for iOS simulator)
    detox test -c ios.sim.debug  # Run the tests (example for iOS simulator)
    ```

## Troubleshooting

-   **Database Connection Issues:**
    -   Verify that the PostgreSQL server is running.
    -   Check your database credentials in the `.env` file.
    -   Ensure that the database user has the necessary permissions.
-   **Dependency Conflicts:**
    -   If you encounter dependency conflicts, try deleting the `node_modules` directory and the `package-lock.json` file, then run `npm install` again.
-   **Testing Errors:**
    -   Carefully review the error messages and stack traces.
    -   Use `console.log` statements for debugging.
    -   Consult the Jest and Detox documentation for troubleshooting tips.
-   **Navigation Issues:**
    -   Make sure you have correctly configured `NavigationContainer` and `Stack.Navigator` in your `App.tsx`.
    -   Verify that the screen names used in `navigation.navigate` calls match the names defined in your navigation stack.

## Conclusion

This guide provides a comprehensive plan for migrating your Cleaning Business SaaS project from WebContainer to a local development environment. By following these steps, you will be able to set up a fully functional development environment, implement real database interactions, write comprehensive tests, and build a robust and maintainable mobile application. Remember to replace all placeholder functions and simulated behaviors with actual implementations as you transition to local development.
