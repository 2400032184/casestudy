import { Card, CardHeader, CardContent, CardActions, Typography, Chip, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

export default function AppointmentCard({ appointment, onCancel }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Card sx={{
        background: "linear-gradient(145deg, #fff1f0 0%, #ffe4e1 100%)",
        borderRadius: 3,
        boxShadow: 6,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 12 }
      }}>
        <CardHeader
          title={<Typography variant="h6" sx={{ color: "#1b1b1b" }}>{appointment.doctor}</Typography>}
          subheader={<Typography variant="body2">{appointment.department}</Typography>}
        />
        <CardContent>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>{appointment.patientName}</Typography>
          <Typography variant="body2">{appointment.phone}</Typography>
          <Typography variant="body2">
            {appointment.date && appointment.time ? `${dayjs(appointment.date).format("DD/MM/YYYY")} ${dayjs(appointment.time).format("HH:mm")}` : ""}
          </Typography>
          <Chip label={appointment.visitType} color="primary" sx={{ mr: 1, mt: 1 }} />
          <Chip label="Booked" color="success" sx={{ mt: 1 }} />
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => setConfirmOpen(true)}>
            Cancel
          </Button>
        </CardActions>
      </Card>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to cancel this appointment?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button onClick={() => { onCancel(); setConfirmOpen(false); }} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
