export const getGeocoding = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { country, name, latitude, longitude } = data.results[0];
    return { country, name, latitude, longitude };
  } catch (error) {
    console.error(error);
  }
};
