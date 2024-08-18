import React, { useState } from 'react';
import Dashboard from '../containers/Dashboard';
import Planning from '../containers/Planning';

function App() {
  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-2">
            <Dashboard />
          </div>
          <div className="col-10">
            <Planning />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
