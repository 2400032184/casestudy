import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const doctors = ["Dr. Rao – Cardiology", "Dr. Meera – Dermatology", "Dr. Arjun – Pediatrics"];
const departments = ["Cardiology", "Dermatology", "Pediatrics", "General Medicine"];

export default function AppointmentForm({ addAppointment }) {
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    doctor: "",
    department: "",
    date: null,
    time: null,
    visitType: "New",
    notes: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.patientName) newErrors.patientName = "Required";
    if (!form.phone || !/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter valid 10-digit number";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter valid email";
    if (!form.doctor) newErrors.doctor = "Required";
    if (!form.department) newErrors.department = "Required";
    if (!form.date || dayjs(form.date).isBefore(dayjs(), "day")) newErrors.date = "Future date required";
    if (!form.time) newErrors.time = "Required";
    if (!form.consent) newErrors.consent = "Consent required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addAppointment(form);
    handleReset();
  };

  const handleReset = () => {
    setForm({
      patientName: "",
      phone: "",
      email: "",
      doctor: "",
      department: "",
      date: null,
      time: null,
      visitType: "New",
      notes: "",
      consent: false,
    });
    setErrors({});
  };

  return (
    <Card sx={{ backgroundColor: "#ffffffff", p: 3, mb: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Book Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Patient Name"
                value={form.patientName}
                onChange={(e) => handleChange("patientName", e.target.value)}
                fullWidth
                required
                error={!!errors.patientName}
                helperText={errors.patientName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                fullWidth
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.doctor}>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={form.doctor}
                  onChange={(e) => handleChange("doctor", e.target.value)}
                >
                  {doctors.map((doc) => (
                    <MenuItem key={doc} value={doc}>{doc}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.doctor}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={form.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.department}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Appointment Date"
                value={form.date}
                onChange={(newValue) => handleChange("date", newValue)}
                slotProps={{ textField: { fullWidth: true, error: !!errors.date, helperText: errors.date } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Appointment Time"
                value={form.time}
                onChange={(newValue) => handleChange("time", newValue)}
                slotProps={{ textField: { fullWidth: true, error: !!errors.time, helperText: errors.time } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mb: 1 }}>Visit Type</Typography>
              <RadioGroup
                row
                value={form.visitType}
                onChange={(e) => handleChange("visitType", e.target.value)}
              >
                <FormControlLabel value="New" control={<Radio />} label="New" />
                <FormControlLabel value="Follow-up" control={<Radio />} label="Follow-up" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Symptoms / Notes"
                multiline
                rows={3}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                fullWidth
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required error={!!errors.consent}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                    />
                  }
                  label="I agree to clinic policies"
                />
                <FormHelperText>{errors.consent}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outlined"
                sx={{ color: "secondary.main", borderColor: "secondary.main" }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
