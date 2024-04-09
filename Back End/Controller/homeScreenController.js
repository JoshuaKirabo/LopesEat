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
};

module.exports = homeScreenController;
