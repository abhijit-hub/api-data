const express = require('express');
const app = express();

app.use(express.json());

// In-memory "database"
let dataStore = [];

// POST endpoint to insert multiple data entries with fixed timestamps
app.post('/api/insert', (req, res) => {
    const employees = req.body;

    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({
            message: 'Please provide an array of employee data.'
        });
    }

    // Get current date (no time)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const baseDate = `${year}-${month}-${day}`;

    employees.forEach(employee => {
        const { employee_name, employee_code } = employee;
        const direction = employee.direction || null;

        // Create two entries for 10:00 and 12:00
        const timestamps = [`${baseDate} 10:00:00`, `${baseDate} 12:00:00`];

        timestamps.forEach(timestamp => {
            const newEntry = { employee_name, direction, employee_code, timestamp };
            dataStore.push(newEntry);
        });
    });

    return res.status(201).json({
        message: 'Data inserted successfully!',
        count: employees.length * 2,
        data: dataStore
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

// DELETE endpoint to remove entries by employee_code
app.delete('/employees/:employee_code', (req, res) => {
    const code = req.params.employee_code;
    const initialLength = dataStore.length;

    dataStore = dataStore.filter(emp => emp.employee_code !== code);

    if (dataStore.length === initialLength) {
        return res.status(404).json({ message: 'Employee not found.' });
    }

    res.json({ message: `Employee with code ${code} deleted.` });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
