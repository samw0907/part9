import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, List, ListItem, TextField, Button, Alert, MenuItem } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Gender, Patient, DiagnosesEntry, EntryWithoutId, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import EntryDetails from "./EntryDetails";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";

const FullPatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<DiagnosesEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [newEntry, setNewEntry] = useState<EntryWithoutId>({
    type: "Hospital",
    date: "",
    specialist: "",
    description: "",
    discharge: { date: "", criteria: "" },
    diagnosisCodes: [],
  });

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchedDiagnoses = await diagnosesService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    if (!id) return;

    try {
      setError(null);
      const addedEntry = await patientService.addEntry(id, {
        ...newEntry,
        diagnosisCodes: newEntry.diagnosisCodes?.length ? newEntry.diagnosisCodes : undefined,
      });
      if (patient) {
        setPatient({
          ...patient,
          entries: [...patient.entries, addedEntry],
        });
      }
      setNewEntry({
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        discharge: { date: "", criteria: "" },
        diagnosisCodes: [],
      });
    } catch (e) {
      setError("Failed to add entry. Please check your input.");
    }
  };

  const renderAdditionalFields = () => {
    switch (newEntry.type) {
      case "Hospital":
        return (
          <>
            <TextField
              fullWidth
              label="Discharge Date"
              type="date"
              value={newEntry.discharge?.date || ""}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  discharge: {
                    ...newEntry.discharge,
                    date: e.target.value || "",
                  },
                } as HospitalEntry)
              }
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Discharge Criteria"
              value={newEntry.discharge?.criteria || ""}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  discharge: {
                    ...newEntry.discharge,
                    criteria: e.target.value || "",
                  },
                } as HospitalEntry)
              }
              margin="normal"
            />
          </>
        );
        case "HealthCheck":
          return (
            <TextField
              select
              fullWidth
              label="Health Check Rating"
              value={newEntry.healthCheckRating ?? ""}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  healthCheckRating: Number(e.target.value) as HealthCheckEntry["healthCheckRating"],
                } as HealthCheckEntry)
              }
              margin="normal"
            >
              <MenuItem value={0}>0 - healthy</MenuItem>
              <MenuItem value={1}>1 - low risk</MenuItem>
              <MenuItem value={2}>2 - high risk</MenuItem>
              <MenuItem value={3}>3 - critical risk</MenuItem>
            </TextField>
          );
        case "OccupationalHealthcare":
          return (
            <>
              <TextField
                fullWidth
                label="Employer Name"
                value={newEntry.employerName || ""}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    employerName: e.target.value || "",
                  } as OccupationalHealthcareEntry)
                }
                margin="normal"
              />
              <Typography variant="subtitle1" gutterBottom>
                Sick Leave
              </Typography>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={newEntry.sickLeave?.startDate || ""}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    sickLeave: {
                      ...newEntry.sickLeave,
                      startDate: e.target.value || "",
                    },
                  } as OccupationalHealthcareEntry)
                }
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={newEntry.sickLeave?.endDate || ""}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    sickLeave: {
                      ...newEntry.sickLeave,
                      endDate: e.target.value || "",
                    },
                  } as OccupationalHealthcareEntry)
                }
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </>
          );        
      default:
        return null;
    }
  };

  if (!patient) {
    return <Typography>Loading patient details...</Typography>;
  }

  return (
    <Box>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Add New Entry
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          select
          fullWidth
          label="Entry Type"
          value={newEntry.type}
          onChange={(e) => {
            const selectedType = e.target.value as EntryWithoutId["type"];
            if (selectedType === "Hospital") {
              setNewEntry({
                type: "Hospital",
                date: "",
                specialist: "",
                description: "",
                discharge: { date: "", criteria: "" },
                diagnosisCodes: [],
              });
            } else if (selectedType === "HealthCheck") {
              setNewEntry({
                type: "HealthCheck",
                date: "",
                specialist: "",
                description: "",
                healthCheckRating: 0,
                diagnosisCodes: [],
              });
            } else if (selectedType === "OccupationalHealthcare") {
              setNewEntry({
                type: "OccupationalHealthcare",
                date: "",
                specialist: "",
                description: "",
                employerName: "",
                sickLeave: { startDate: "", endDate: "" },
                diagnosisCodes: [],
              });
            }
          }}
          margin="normal"
        >
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Description"
          value={newEntry.description}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Specialist"
          value={newEntry.specialist}
          onChange={(e) => setNewEntry({ ...newEntry, specialist: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Diagnosis Codes"
          value={newEntry.diagnosisCodes?.join(", ") || ""}
          onChange={(e) => {
            const codes = e.target.value.split(",").map((code) => code.trim());
            setNewEntry({
              ...newEntry,
              diagnosisCodes: codes,
            });
          }}
          onBlur={() => {
            const validCodes = newEntry.diagnosisCodes?.filter((code) =>
              /^[A-Za-z0-9]{2,8}$/.test(code));
            setNewEntry({
              ...newEntry,
              diagnosisCodes: validCodes,
            });
          }}
          margin="normal"
          />
        {renderAdditionalFields()}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Entry
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>
        {patient.name} {renderGenderIcon(patient.gender as Gender)}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h5" gutterBottom style={{ marginTop: "1em" }}>
        Entries
      </Typography>
      <List>
        {patient.entries.map((entry) => (
          <ListItem key={entry.id}>
            <Box>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FullPatientInfoPage;
