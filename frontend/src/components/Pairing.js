import React, { useState } from 'react';

function Pairing({ addPairedStudents, addStudentToList, studentsList }) {
  const [studentName, setStudentName] = useState('');
  const [pairingResult, setPairingResult] = useState([]);

  // Predefined list of students to be paired randomly
  const randomStudents = ["Alice", "Bob", "Charlie", "David", "Eve"];

  // Handle adding a student manually to the list
  const handleAddStudent = () => {
    if (studentName) {
      addStudentToList(studentName);
      setStudentName('');  // Clear the input field
    }
  };

  // Handle random pairing of students (from manually added list + random students)
  const handleRandomPairing = () => {
    const allStudents = [...studentsList, ...randomStudents];
    const shuffled = [...allStudents].sort(() => Math.random() - 0.5);
    const pairs = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      pairs.push({ student1: shuffled[i], student2: shuffled[i + 1] || 'N/A' });
    }

    setPairingResult(pairs);
    pairs.forEach((pair) => addPairedStudents(pair));  // Pass the pairs to the parent
  };

  return (
    <div>
      <h2>Pair Students</h2>
      <div>
        <input
          type="text"
          placeholder="Enter student name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
      <div>
        <button onClick={handleRandomPairing}>Randomly Pair</button>
      </div>

      <h3>Student List:</h3>
      <ul>
        {studentsList.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>

      <h3>Randomly Paired Students:</h3>
      <ul>
        {pairingResult.map((pair, index) => (
          <li key={index}>
            {pair.student1} and {pair.student2}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pairing;
