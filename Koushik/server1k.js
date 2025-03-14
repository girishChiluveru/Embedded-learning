const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/kmitstudent', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Student Schema and Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Add a new student
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(200).json({ message: 'Student added', student: newStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student', details: error.message });
  }
});

// Fetch all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students', details: error.message });
  }
});

// Update a student’s course by ID
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { course } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { course },
      { new: true, runValidators: true }
    );
    if (updatedStudent) {
      res.status(200).json({ message: 'Student course updated', student: updatedStudent });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student course', details: error.message });
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (deletedStudent) {
      res.status(200).json({ message: 'Student removed', student: deletedStudent });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student', details: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});