import React from "react";
import { Entry, DiagnosesEntry } from "../types";
import { Box, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import HeartIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: DiagnosesEntry[];
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
  const renderDiagnosisCodes = (codes: string[] | undefined) => {
    if (!codes) return null;

    return (
      <Typography>
        {codes.map((code, index) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return (
            <span key={code}>
              {code}
              {diagnosis ? ` - ${diagnosis.name}` : ""}
              {index < codes.length - 1 && ", "}
            </span>
          );
        })}
      </Typography>
    );
  };

  const getHeartIconColor = (rating: 0 | 1 | 2 | 3): string => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
          <Typography variant="h6">
            {entry.date}
            <MedicalServicesIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          {renderDiagnosisCodes(entry.diagnosisCodes)}
          <Typography>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
          <Typography>diagnosed by {entry.specialist}</Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
          <Typography variant="h6">
            {entry.date}
            <WorkIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography>employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>
              Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography>diagnosed by {entry.specialist}</Typography>
        </Box>
      );

    case "HealthCheck":
      return (
        <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
          <Typography variant="h6">
            {entry.date}
            <MonitorHeartIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          <HeartIcon
            style={{ color: getHeartIconColor(entry.healthCheckRating) }}
          />
          <Typography>diagnosed by {entry.specialist}</Typography>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
