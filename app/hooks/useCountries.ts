import countries from 'world-countries'

// const formatedCountries = countries.map((country) => ({
//   value: country.cca2,
//   label: country.name.common,
//   flag: country.flag,
//   latlng: country.latlng,
//   region: country.region,
// }))

// format countries but add a key because react needs it
const formatedCountries = countries.map((country) => ({
  key: country.idd,
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}))

const useCountries = () => {
  const getAll = () => formatedCountries

  const getByValue = (countryValue: string) => {
    return formatedCountries.find((item) => item.value === countryValue)
  }

  return {
    getAll,
    getByValue,
  }
}

export default useCountries
