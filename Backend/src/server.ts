import 'dotenv/config';
import crypto from 'crypto';

// Polyfill global crypto for mongodb driver if needed
if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: crypto.webcrypto,
  });
}

import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT ?? 5000;

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
