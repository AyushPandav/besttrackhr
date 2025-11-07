import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

// ✅ Named as SPRING_BOOT_URL (per your request), but this points to your MockAPI
const SPRING_BOOT_URL = "https://6908f1ab2d902d0651b237fc.mockapi.io/daily-report";

const EmpDailyReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    task: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(SPRING_BOOT_URL, formData);
      alert("✅ Daily Report Submitted Successfully!");

      // Reset form
      setFormData({ name: "", email: "", task: "", date: "" });
    } catch (error) {
      console.error("❌ Error submitting report:", error);
      alert("❌ Failed to submit report. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f4f4f4ff, #e5e5e5ff)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Employee Daily Report
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Task Description"
            name="task"
            multiline
            rows={4}
            value={formData.task}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#2e3b8f",
              },
            }}
          >
            Submit Report
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EmpDailyReport;
