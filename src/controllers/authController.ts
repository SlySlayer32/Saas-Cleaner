import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Placeholder functions to simulate user creation and retrieval
const createUser = async (userData: any): Promise<any> => {
  // In a real scenario, you would create a user in the database here
  console.log('User created:', userData);
  return { id: 'placeholder-id', ...userData };
};

const findUserByEmail = async (email: string): Promise<any> => {
  // In a real scenario, you would retrieve a user from the database here
  if (email === 'test@example.com') {
    return {
      id: 'placeholder-id',
      email: 'test@example.com',
      password: 'password', // In reality, store and compare hashed passwords
    };
  }
  return null;
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json({ message: 'User registered', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (user && password === user.password) {
      // Normally, compare hashed password with bcrypt
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};
