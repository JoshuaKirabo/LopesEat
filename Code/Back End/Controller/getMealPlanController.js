const {generateMealPlan} = require('../DietingAlgorithm/index');
const {getUserData} = require('../Model/getMealPlanModel');

function sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

const getMealPlan = {
getMealPlan: async (req, res) => 
    {
        const { userId } = req.params;
        try 
            {
                const userData = await getUserData(userId);

                if (!userData) 
                    {
                        return res.status(404).json({ success: false, message: "User data not found" });
                    }

               
                const mealPlan = await generateMealPlan(userData, userId);  // This assumes generateMealPlan is defined elsewhere and properly imported
                await sleep(5000);
                console.log(mealPlan);

                res.status(200).json(mealPlan);
            } 
        catch (error) 
            {
                console.error('Error fetching user data or generating meal plan:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch user data or generate meal plan' });
            }
    }
}

module.exports = getMealPlan;