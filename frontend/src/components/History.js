import React from 'react';

function History({ history }) {
  return (
    <div>
      <h2>Pairing History</h2>
      {history.length > 0 ? (
        history.map((pair, index) => (
          <div key={index}>
            <p>{pair.student1} and {pair.student2}</p>
          </div>
        ))
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
}

export default History;
