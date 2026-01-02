import dotenv from 'dotenv';
import app from './app.js';
import connectToDB from './config/db.js';

// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: `./${envFile}` });

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDB();

    const PORT = process.env.PORT || 3000;

    // Start server
    const server = app.listen(PORT, '0.0.0.0', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`\n Server is running on port ${PORT}`);
      }
    });

    // Handle server errors
    server.on('error', (error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Server error:', error.message);
        if (error.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use`);
        }
      }
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Unhandled Promise Rejection at:', promise);
        console.error('Reason:', err);
        console.error(err.stack);
      }
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
      }
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('SIGTERM received, shutting down gracefully...');
      }
      server.close(() => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Server closed');
        }
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('\nSIGINT received, shutting down gracefully...');
      }
      server.close(() => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Server closed');
        }
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};


startServer();