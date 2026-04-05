import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace_name
      ? `https://${codespace_name}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    console.log('Fetching teams from:', apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Teams data:', data);
        if (data.results) {
          setTeams(data.results);
        } else {
          setTeams(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teams</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td><strong>{team.name}</strong></td>
              <td>
                {team.members && team.members.length > 0
                  ? team.members.map(m => m.name).join(', ')
                  : 'No members'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
