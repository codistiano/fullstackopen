const PersonForm = ({setNewName, setNewNum, newName, newNum, handleSubmit}) => {
    return (
        <form>
        <div>
          name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <br />
        <div>
          number:{" "}
          <input onChange={(e) => setNewNum(e.target.value)} value={newNum} />
        </div>
        <br />
        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
    )
}

export default PersonForm