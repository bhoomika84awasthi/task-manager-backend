const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config();
const app = express();

// ✅ CORS config
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-manager-frontend-five-liart.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.get('/api/ping', (req, res) => {
  res.send('pong');
});


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
.catch(err => console.error(err));


