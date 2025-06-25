require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const clinicRoute = require('./routes/clinicRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const reviewRoutes = require("./routes/reviewRoute");
const previousAppointmentRoutes = require('./routes/previousAppointmentRoute');
const workingHoursRoutes = require('./routes/workingHoursRoute');
const expertiseRoutes = require('./routes/expertiseRoute');
const contactRoutes = require('./routes/contsctRoute');
const settingRoute = require('./routes/settingsRoute');
const bioRouter = require("./routes/bioRoute");

const fileUpload = require('express-fileupload');


app.use(express.json());
app.use(fileUpload());
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (like cookies) to be included
};

app.use(cors(corsOptions)); 
app.get('/', (req, res) => {
  res.send('Server is up and running');
});
app.use('/api/auth', authRoute)
app.use('/api/clinic', clinicRoute);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/previous-appointments', previousAppointmentRoutes);
app.use('/api/working-hours', workingHoursRoutes);
app.use('/api/expertise', expertiseRoutes);
app.use('/api', contactRoutes);
app.use('/api/settings', settingRoute);
app.use("/api/bio", bioRouter);
// Start the server
const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
    app.listen(5000, ()=>{
        console.log("Server is running on 5000")
    })
});

module.exports = app;