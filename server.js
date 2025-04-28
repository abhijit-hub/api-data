const express = require('express');
const app = express();

app.use(express.json());

// In-memory "database" to store inserted data
let dataStore = [];

// Function to format timestamp as YYYY-MM-DD HH:mm:ss
const formatTimestamp = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// POST endpoint to insert multiple data entries
app.post('/api/insert', (req, res) => {
    const employees = req.body;

    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({
            message: 'Please provide an array of employee data.'
        });
    }

    employees.forEach(employee => {
        const { employee_name, employee_code } = employee;
        const direction = employee.direction || null;
        const timestamp = formatTimestamp(new Date());
        const newEntry = { employee_name, direction, employee_code, timestamp };
        dataStore.push(newEntry);
    });

    return res.status(201).json({
        message: 'Data inserted successfully!',
        data: employees
    });
});

// GET endpoint to retrieve all employee data
app.get('/api/data', (req, res) => {
    if (dataStore.length === 0) {
        return res.status(404).json({
            message: 'No data found.'
        });
    }

    res.json({
        data: dataStore
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
