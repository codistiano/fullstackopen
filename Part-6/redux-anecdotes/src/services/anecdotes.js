const baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await fetch(baseURL)

    if (!response.ok) {
        throw new Error("Error occurred while requesting data!")
    }

    return await response.json()
}

const createNew = async (content) => {
    const response = await fetch(baseURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({content, votes: 0, important: false})
    })

    if (!response.ok) {
        throw new Error("Error occurred while creating new!")
    }

    return await response.json()
}


export default { getAll, createNew }