import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Leaderboard data:', data);
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else if (data && Array.isArray(data.results)) {
          setLeaderboard(data.results);
        } else {
          setLeaderboard([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center my-4">Loading leaderboard...</div>;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              <h2 className="h5 mb-0">Leaderboard</h2>
            </div>
            <div className="card-body">
              {leaderboard.length === 0 ? (
                <div className="alert alert-info">No leaderboard data found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        {Object.keys(leaderboard[0]).map((key) => (
                          <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, idx) => (
                        <tr key={entry.id || idx}>
                          {Object.values(entry).map((val, i) => (
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

export default Leaderboard;
