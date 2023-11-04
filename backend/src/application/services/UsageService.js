const meterClient = require('../../infrastructure/apiClients/MeterClient');
const carbonClient = require('../../infrastructure/apiClients/CarbonClient');

const getMeterData = async (meterId, start, end) => {
  return await meterClient.fetchMeterData(meterId, start, end);
};

const getCarbonIntensity = async (start, end) => {
  return await carbonClient.fetchCarbonIntensityData(start, end);
};

const getFuelMix = async (start, end) => {
  return await carbonClient.fetchFuelMixData(start, end);
};

const calculatePeriodFuelMix = (data) => {
  // Initialize an object to hold the sum of weighted percentages for each fuel type
  let weightedFuelMixSums = {};
  
  // Initialize a variable to hold the sum of all consumption
  let totalConsumption = 0;
  
  // Process each data point
  data.forEach(entry => {
    // Accumulate the total consumption
    let consumption = parseFloat(entry.consumption);
    totalConsumption += consumption;
    
    // Process each fuel type in the generation mix
    if (entry.generationMix !== undefined) {
      entry.generationMix.forEach(fuel => {
        // If the fuel type hasn't been added to the sums object, initialize it
        if (!weightedFuelMixSums[fuel.fuel]) {
          weightedFuelMixSums[fuel.fuel] = 0;
        }
        // Add the weighted percentage for this fuel type (consumption * percentage)
        weightedFuelMixSums[fuel.fuel] += consumption * fuel.perc;
      });
    }
  });
  
  // Calculate the final average percentage for each fuel type
  let monthlyFuelMixPercentages = {};
  for (let fuelType in weightedFuelMixSums) {
    monthlyFuelMixPercentages[fuelType] = (weightedFuelMixSums[fuelType] / totalConsumption) / 100;
  }
  
  // Normalize percentages to sum to 100%
  let sumPercentages = Object.values(monthlyFuelMixPercentages).reduce((sum, current) => sum + current, 0);
  for (let fuelType in monthlyFuelMixPercentages) {
    monthlyFuelMixPercentages[fuelType] = monthlyFuelMixPercentages[fuelType] / sumPercentages;
    monthlyFuelMixPercentages[fuelType] *= 100;
  }
  
  return monthlyFuelMixPercentages;
}

const getCombinedUsageData = async (meterId, start, end) => {
  const meterData = await getMeterData(meterId, start, end);
  const carbonIntensityData = await getCarbonIntensity(start, end);
  const fuelMixData = await getFuelMix(start, end);
  
  const intensityLookup = carbonIntensityData.data.reduce((acc, entry) => {
    const timestamp = new Date(entry.from).getTime();
    acc[timestamp] = entry.intensity.actual;
    return acc;
  }, {});
  
  const fuelMixLookup = fuelMixData.data.reduce((acc, entry) => {
    const timestamp = new Date(entry.from).getTime();
    acc[timestamp] = entry.generationmix;
    return acc;
  }, {});
  
  let totalco2 = 0;
  meterData.data.map(async (dataInterval)=>{
    const intervalTimestamp = new Date(dataInterval.start_interval).getTime();
    const actualIntensity = intensityLookup[intervalTimestamp];
    const generationMix = fuelMixLookup[intervalTimestamp];
    if (actualIntensity !== undefined) {
      dataInterval.actual_intensity = actualIntensity;
      totalco2 += actualIntensity;
    }
    if (generationMix !== undefined) {
      dataInterval.generationMix = generationMix;
    }
  })
  
  meterData.totalco2 = totalco2;
  meterData.weightedFuelMix = calculatePeriodFuelMix(meterData.data);
  delete meterData.data
  return meterData
  
  const response = {
    meterId: meterId,
    start: start,
    end: end,
    monthlyEnergyConsumed: {
      quantity: 100,
      unit: 'kWh'
    },
    monthlyAmountOfC02: {
      quantity: 200,
      unit: 'kgs'
    },
    monthlyFuelPercents: [
      {
        name: 'wind',
        percent: 23.5
      }
    ]
  }
  
  
  return {
    ...meterData,
    ...carbonIntensityData,
    ...fuelMixData,
  };
};

module.exports = {
  getMeterData,
  getCarbonIntensity,
  getFuelMix,
  getCombinedUsageData
};
