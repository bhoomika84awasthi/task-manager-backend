const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();              // ✅ Load .env config first
const app = express();        // ✅ Make sure this line comes BEFORE using app.use()

const allowedOrigins = [
  'http://localhost:3000',
  'https://task-manager-frontend-five-liart.vercel.app'
];

// ✅ Set up CORS BEFORE routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json()); // ✅ Middlewares come next

// Your routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB connection and app.listen() should go after


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
.catch(err => console.error(err));


