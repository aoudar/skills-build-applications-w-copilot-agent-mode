import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Activities data:', data);
        if (Array.isArray(data)) {
          setActivities(data);
        } else if (data && Array.isArray(data.results)) {
          setActivities(data.results);
        } else {
          setActivities([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center my-4">Loading activities...</div>;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="h5 mb-0">Activities</h2>
            </div>
            <div className="card-body">
              {activities.length === 0 ? (
                <div className="alert alert-info">No activities found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        {Object.keys(activities[0]).map((key) => (
                          <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity, idx) => (
                        <tr key={activity.id || idx}>
                          {Object.values(activity).map((val, i) => (
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

export default Activities;
