import z from "zod";
import { NewPatientSchema } from "./src/utils";

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    male = "male",
    female = "female",
    other = "other",
}

export interface Patient extends NewPatientDataEntry {
    id: string;
}

export type NonSensitivePatientInformation = Omit<Patient, 'ssn'>;

export type NewPatientDataEntry = z.infer<typeof NewPatientSchema>
