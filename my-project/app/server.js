const express = require('express'); 
const app = express();
const PORT = 3000; // Define the port number for the server to listen on 

app.use(express.json()); // Middleware to parse JSON request bodies

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);



// Start the server
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
});
