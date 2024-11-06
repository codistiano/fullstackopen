const Filter = ({onChange, value}) => {
    return (
        <p>
        Filter shown with <input onChange={onChange} value={value} />
      </p>
    )
}

export default Filter