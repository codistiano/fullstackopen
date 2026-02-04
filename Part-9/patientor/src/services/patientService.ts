import patientData from "../../data/patients";
import { NewPatientDataEntry, NonSensitivePatientInformation, Patient } from "../../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getAllPatients = (): NonSensitivePatientInformation[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientDataEntry): Patient => {
  const id = uuid();

  const createdPatient = {
    id,
    ...entry,
  };

  patients.push(createdPatient);
  return createdPatient;
};

export default {
  getAllPatients,
  addPatient
};
