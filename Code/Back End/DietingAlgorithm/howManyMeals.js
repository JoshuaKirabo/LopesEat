// In the event the user chose to have two meals
class TwoMealPlan 
    {
        constructor(dayPlan) 
            {
                this.breakfast = dayPlan.breakfast;
                this.dinner = dayPlan.dinner;
            }
    }

// In the event the user chose to have three meals
class ThreeMealPlan 
    {
        constructor(dayPlan) 
            {
                this.breakfast = dayPlan.breakfast;
                this.lunch = dayPlan.lunch;
                this.dinner = dayPlan.dinner;
            }
    }

// In the event the user chose to have four meals
class FourMealPlan 
    {
        constructor(dayPlan) 
            {
                this.breakfast = dayPlan.breakfast;
                this.lunch = dayPlan.lunch;
                this.afternoonSnack = dayPlan.afternoonSnack;
                this.dinner = dayPlan.dinner;
            }
    }

// In the event the user chose to have five meals
class FiveMealPlan 
    {
        constructor(dayPlan) 
            {
                this.breakfast = dayPlan.breakfast;
                this.morningSnack = dayPlan.morningSnack;
                this.lunch = dayPlan.lunch;
                this.afternoonSnack = dayPlan.afternoonSnack;
                this.dinner = dayPlan.dinner;
            }
    }

// Factory function to create the appropriate meal plan based on the number of meals
function storeMeals(dayPlan, numberOfMeals) 
    {          
        switch (numberOfMeals) 
            {
                case 2:
                    return new TwoMealPlan(dayPlan);
                case 3:
                    return new ThreeMealPlan(dayPlan);
                case 4:
                    return new FourMealPlan(dayPlan);
                case 5:
                    return new FiveMealPlan(dayPlan);
                default:
                    throw new Error("Unsupported number of meals");
            }
    }



module.exports = { storeMeals };
