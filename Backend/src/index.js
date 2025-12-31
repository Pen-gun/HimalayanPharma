import dotenv from 'dotenv';
import app from './app.js';
import connectToDB from './config/db.js';

dotenv.config({ path: './.env.local' });

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDB();

    const PORT = process.env.PORT || 5000;

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api/v1\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();