import { Gender, NewPatientDataEntry } from "../types";
import z from "zod";

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
})

export const toNewPatientEntry = (object: unknown): NewPatientDataEntry => {
    return NewPatientSchema.parse(object)
}
