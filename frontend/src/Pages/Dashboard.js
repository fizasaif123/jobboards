import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import './Dashboard.css';


function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState("all"); // Default filter: All jobs
  const userId = localStorage.getItem("userId");
  const fetchJobs = async (filter) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/jobs/filter`, {
        params: { userId, filterType: filter },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  };
  

  const handleAcceptJob = async (jobId) => {
    try {
      const response = await axios.post("http://localhost:9000/api/jobs/accept", { userId, jobId });
      alert(response.data.message); // Notify the user
      fetchJobs(filterType); // Refresh the job list
    } catch (error) {
      console.error("Error accepting job:", error.response?.data || error.message);
      alert("you have already acceptd the job");
    }
  };
  
  useEffect(() => {
    fetchJobs(filterType); // Fetch jobs based on the current filter
  }, [filterType]);

  return (
    <Box sx={{ padding: 4 }} className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Jobs Dashboard
      </Typography>
      <Box sx={{ marginBottom: 3 }} className="filter-buttons">
        <Button
          variant={filterType === "all" ? "contained" : "outlined"}
          onClick={() => setFilterType("all")}
          sx={{ marginRight: 2 }}
          className="filter-button"
        >
          All Jobs
        </Button>
        <Button
          variant={filterType === "area" ? "contained" : "outlined"}
          onClick={() => setFilterType("area")}
          sx={{ marginRight: 2 }}
          className="filter-button"
        >
          Jobs in Your Area
        </Button>
        <Button
          variant={filterType === "accepted" ? "contained" : "outlined"}
          onClick={() => setFilterType("accepted")}
          className="filter-button"
        >
          Accepted Jobs
        </Button>
      </Box>
      <Grid container spacing={3}>
        {jobs.length === 0 ? (
          <Typography className="no-jobs-message">
            No jobs found for the selected filter.
          </Typography>
        ) : (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card className="job-card">
                <CardContent>
                  <Typography variant="h6" className="job-title">
                    {job.tradeType}
                  </Typography>
                  <Typography className="job-description">
                    {job.description}
                  </Typography>
                  <Typography className="job-location">
                    Location: {job.address || "Unknown Location"}
                  </Typography>
                  {filterType !== "accepted" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => handleAcceptJob(job._id)}
                    >
                      Accept
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default Dashboard;
