import diagnosisData from "../../data/diagnoses"
import { Diagnosis } from "../../types"

const diagnosis: Diagnosis[] = diagnosisData

const getAllDiagnosis = (): Diagnosis[] => {
    return diagnosis
}

export default {
    getAllDiagnosis
}