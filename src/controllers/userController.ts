// Placeholder functions simulating user API endpoint logic (WebContainer environment)

    const users = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    ];

    export const getUsers = async (): Promise<any[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(users);
        }, 500);
      });
    };

    export const getUserById = async (id: string): Promise<any> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = users.find((u) => u.id === id);
          if (user) {
            resolve(user);
          } else {
            reject(new Error('User not found (404)'));
          }
        }, 500);
      });
    };

    export const createUser = async (userData: { name: string; email: string }): Promise<any> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!userData.name || !userData.email) {
            reject(new Error('Invalid request body (400)'));
          } else {
            const newUser = { id: String(users.length + 1), ...userData };
            users.push(newUser);
            resolve(newUser);
          }
        }, 500);
      });
    };

    export const updateUser = async (id: string, userData: { name?: string; email?: string }): Promise<any> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = users.findIndex((u) => u.id === id);
          if (userIndex === -1) {
            reject(new Error('User not found (404)'));
          } else {
            if (!userData.name && !userData.email) {
              reject(new Error('Invalid request body (400)'));
            }
            users[userIndex] = { ...users[userIndex], ...userData };
            resolve(users[userIndex]);
          }
        }, 500);
      });
    };

    export const deleteUser = async (id: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = users.findIndex((u) => u.id === id);
          if (userIndex === -1) {
            reject(new Error('User not found (404)'));
          } else {
            users.splice(userIndex, 1);
            resolve();
          }
        }, 500);
      });
    };
