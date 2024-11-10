const Countries = ({countries, displayDetail}) => {
    return (
        countries?.map((country, key) => {
            return (
              <>
                <p key={key}>
                  {country.name.common}{" "}
                  <button onClick={() => displayDetail(country.name.common)}>
                    Show
                  </button>
                </p>
              </>
            );
          })
    )
}

export default Countries