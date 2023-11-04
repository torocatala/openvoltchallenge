const usageService = require('../../application/services/UsageService');

const getUsageData = async (req, res) => {
  try {
    const { meterId, start, end } = req.params;

    const combinedUsageData = await usageService.getCombinedUsageData(meterId, start, end);

    res.json(combinedUsageData);
  } catch (error) {

    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsageData,
};
