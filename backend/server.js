require('dotenv').config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

(async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
    });
    server.on('error', (err) => {
      console.error('Server listen error:', err.code || err.message);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();