import { Gender, NewPatientDataEntry } from "../types";

const toNewPatientEntry = (object: unknown): NewPatientDataEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error("Data missing")
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        }

        return newEntry
    }

    throw new Error("Incorrect Data: some fields are missing!")
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing content')
    }

    return name
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date)
    }
    return date
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender)
    }
    
    return gender
}

const parseSSN = (num: unknown): string => {
    if (!isString(num)) {
        throw new Error("Incorrect or missing ssn: " + num)
    }

    return num
}

const parseOccupation = (occ: unknown): string => {
    if (!isString(occ)) {
        throw new Error("Incorrect or missing occupation: " + occ)
    }

    return occ
}


export default toNewPatientEntry