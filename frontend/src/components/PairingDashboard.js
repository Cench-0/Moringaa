import React from 'react';

function PairingDashboard({ pairedStudents, addToHistory }) {
  const safePairedStudents = pairedStudents || [];

  return (
    <div>
      <h2>Paired Students</h2>
      <ul>
        {safePairedStudents.length === 0 ? (
          <li>No students paired yet.</li>
        ) : (
          safePairedStudents.map((pair, index) => (
            <li key={index}>
              {pair.student1} and {pair.student2}
              <button onClick={() => addToHistory(pair)}>Add to History</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PairingDashboard;
