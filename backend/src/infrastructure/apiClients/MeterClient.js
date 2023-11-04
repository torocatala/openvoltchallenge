const fetch = require('node-fetch');
var dotenv = require('dotenv').config();

const API_BASE_URL = 'https://api.openvolt.com/v1/interval-data';
const API_KEY = process.env.OPENVOLT_API_KEY;

const fetchMeterData = async (meterId, start, end) => {
  const queryParams = new URLSearchParams({
    meter_id: meterId,
    granularity: 'hh',
    start_date: start,
    end_date: end
  });

  const url = `${API_BASE_URL}?${queryParams}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY 
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error while fetching meter data! status: ${response.status} ${JSON.stringify(response)}`);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    console.error('error:' + err.message);
  }
};

module.exports = {
  fetchMeterData
};
