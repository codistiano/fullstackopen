import express, { Request, Response, NextFunction } from "express";

import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import { NewPatientDataEntry, Patient } from "../../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

const newPatientMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  } else {
    res.status(400).send({ error: "Unknown error" });
  }
};

router.post(
  "/",
  newPatientMiddleware,
  (
    req: Request<unknown, unknown, NewPatientDataEntry>,
    res: Response<Patient>,
  ) => {
    const addedPatient = patientService.addPatient(req.body);
    res.send(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
