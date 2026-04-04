
import React, { useState } from 'react';
import logo from './logo.svg';
import octofitSmallLogo from '../public/octofitapp-small.svg';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App bg-light min-vh-100">
      {/* Bootstrap Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={octofitSmallLogo} alt="OctoFit Logo" className="octofitapp-small-logo me-2" />
            OctoFit Tracker
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Teams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Leaderboard</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="App-header py-4">
        <img src={logo} className="App-logo mb-3" alt="logo" />
        <h1 className="display-4 mb-3">Welcome to <span className="text-primary">OctoFit Tracker</span></h1>
        <p className="lead">Track your fitness, join teams, and compete on the leaderboard!</p>
        <a className="btn btn-primary btn-lg m-2" href="#" role="button">Get Started</a>
        <button className="btn btn-outline-secondary btn-lg m-2" onClick={() => setShowModal(true)}>Show Modal</button>
      </header>

      {/* Bootstrap Card Example */}
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h2 className="h5 mb-0">Recent Activity</h2>
              </div>
              <div className="card-body">
                {/* Bootstrap Table Example */}
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Activity</th>
                      <th>Duration</th>
                      <th>Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2026-04-04</td>
                      <td>Running</td>
                      <td>30 min</td>
                      <td>300</td>
                    </tr>
                    <tr>
                      <td>2026-04-03</td>
                      <td>Cycling</td>
                      <td>45 min</td>
                      <td>400</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bootstrap Form Example */}
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h2 className="h5 mb-0">Log New Activity</h2>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="activityType" className="form-label">Activity Type</label>
                    <select className="form-select" id="activityType">
                      <option>Running</option>
                      <option>Cycling</option>
                      <option>Swimming</option>
                      <option>Walking</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                    <input type="number" className="form-control" id="duration" min="1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calories Burned</label>
                    <input type="number" className="form-control" id="calories" min="1" />
                  </div>
                  <button type="submit" className="btn btn-success">Log Activity</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal Example */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Example Modal</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>This is a Bootstrap modal example. All modals in the app should follow this style.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
