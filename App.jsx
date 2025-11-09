import { useState } from "react";
import { Container, Divider, Grid, Snackbar, Alert, Typography, Box } from "@mui/material";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentCard from "./components/AppointmentCard";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [snackbar, setSnackbar] = useState(false);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
    setSnackbar(true);
  };

  const removeAppointment = (index) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", 
      py: 5 
    }}>
      <Container sx={{ 
        backgroundColor: "rgba(255,255,255,0.9)", 
        borderRadius: 4, 
        p: 4, 
        boxShadow: 6 
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Doctor Appointment Booking
        </Typography>

        <AppointmentForm addAppointment={addAppointment} />

        <Divider sx={{ my: 4, borderColor: "secondary.main" }} />

        {appointments.length > 0 && (
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your Appointments
          </Typography>
        )}

        <Grid container spacing={3}>
          {appointments.map((appt, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AppointmentCard appointment={appt} onCancel={() => removeAppointment(index)} />
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Appointment booked!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App;
