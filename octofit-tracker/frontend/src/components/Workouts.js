import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Workouts data:', data);
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else if (data && Array.isArray(data.results)) {
          setWorkouts(data.results);
        } else {
          setWorkouts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center my-4">Loading workouts...</div>;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-danger text-white">
              <h2 className="h5 mb-0">Workouts</h2>
            </div>
            <div className="card-body">
              {workouts.length === 0 ? (
                <div className="alert alert-info">No workouts found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        {Object.keys(workouts[0]).map((key) => (
                          <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {workouts.map((workout, idx) => (
                        <tr key={workout.id || idx}>
                          {Object.values(workout).map((val, i) => (
                            <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
