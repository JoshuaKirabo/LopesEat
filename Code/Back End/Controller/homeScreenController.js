// In homeScreenController.js
const homeScreenModel = require('../Model/homeScreenModel');

const homeScreenController = {
    
  getMealCount: async function(req, res) {
    try {
      const { userId } = req.params;
      const mealCount = await homeScreenModel.getMealCountForUser(userId);
      res.json({ meals_a_day: mealCount });
    } catch (error) {
      console.error('Failed to get meal count:', error);
      res.status(500).send('Failed to get meal count');
    }
  },

  getUserWeight: async function(req, res) {
    try {
      const { userId } = req.params;
      const weight = await homeScreenModel.getUserWeight(userId);
      res.json({ weight_in_lbs: weight });
    } catch (error) {
      console.error('Failed to get user weight:', error);
      res.status(500).send('Failed to get user weight');
    }
  }


};

module.exports = homeScreenController;
