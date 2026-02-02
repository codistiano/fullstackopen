import patientData from "../../data/patients";
import { NonSensitivePatientInformation, Patient } from "../../types";

const patients: Patient[] = patientData;

const getAllPatients = (): NonSensitivePatientInformation[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getAllPatients,
};
