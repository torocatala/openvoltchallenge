const fetch = require('node-fetch');

const API_BASE_URL = 'https://api.carbonintensity.org.uk';


const fetchCarbonIntensityPeriodData = async (start, end, period) => {

  const uri = 'intensity'

  const url = `${API_BASE_URL}/${uri}/${start}/${end}/${period}`;
  console.log(url)
  try {
    //const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error while fetching carbon intensity period data! status: ${response.status} ${JSON.stringify(response)}`);
    }
    const json = await response.json();
    return json
  } catch (err) {
    console.error('error:' + err.message);
  }
};

const fetchCarbonIntensityData = async (start, end) => {

  const uri = 'intensity'

  const url = `${API_BASE_URL}/${uri}/${start}/${end}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error while fetching carbon intensity data! status: ${response.status} ${JSON.stringify(response)}`);
    }
    const json = await response.json();
    return json
  } catch (err) {
    console.error('error:' + err.message);
  }
};

const fetchFuelMixData = async (start, end) => {
  const uri = 'generation'

  const url = `${API_BASE_URL}/${uri}/${start}/${end}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error while fetching fuel mix data! status: ${response.status} ${JSON.stringify(response)}`);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    console.error('error:' + err.message);
  }
};

module.exports = {
  fetchCarbonIntensityPeriodData,
  fetchCarbonIntensityData,
  fetchFuelMixData
};
