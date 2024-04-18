// dietingGoal.js

const calculateUserBMR = (userData) =>
    {
        let BMR;

        // Since our weight is in lbs, we have to first convert it to kg
        const weight_in_kg = userData.weight_in_lbs * 0.453592;


        if (userData.gender === 'Male') 
            {
                BMR = 88.362 + (13.397 * weight_in_kg) + (4.799 * userData.height_in_cm) - (5.677 * userData.age);
            } 
        else if (userData.gender === 'Female') 
            {
                BMR = 447.593 + (9.247 * weight_in_kg) + (3.098 * userData.height_in_cm) - (4.330 * userData.age);
            }
        return BMR;
    }


const determineTDEEMultiplier = (userData) =>
    {
        let activityScore = 0;
        let tdeeMultiplier;
    
        // Daily Schedule
        switch(userData.daily_schedule) 
            {
                case 'active':
                    activityScore += 3;
                    break;
                case 'moderately_active':
                    activityScore += 2;
                    break;
                case 'not active':
                    activityScore += 1;
                    break;
            }
    
        // Exercise Frequency
        switch(userData.exercise_frequency) 
            {
                case 'almost-every-day':
                    activityScore += 4;
                    break;
                case 'several-times-a-week':
                    activityScore += 3;
                    break;
                case 'several-times-a-month':
                    activityScore += 2;
                    break;
                case 'never':
                    activityScore += 0;
                    break;
            }
    
        // Reaction to Stairs
        switch(userData.after_taking_a_flight_of_stairs) 
            {
                case 'easily_walk_up_flights':
                    activityScore += 3;
                    break;
                case 'ok_after_one_flight':
                    activityScore += 2;
                    break;
                case 'somewhat_out_of_breath':
                    activityScore += 1;
                    break;
                case 'out_of_breath':
                    activityScore += 0;
                    break;
            }
    
        // Walk Frequency
        switch(userData.walk_frequency) 
            {
                case 'almost_every_day':
                    activityScore += 3;
                    break;
                case '3_4_times_a_week':
                    activityScore += 2;
                    break;
                case '1_2_times_a_week':
                    activityScore += 1;
                    break;
                case 'once_a_month':
                    activityScore += 0;
                    break;
            }
    
        if (activityScore >= 12) 
            {
                tdeeMultiplier = 1.9; // Extra Active
            } 
        else if (activityScore >= 10) 
            {
                tdeeMultiplier = 1.725; // Very Active
            } 
        else if (activityScore >= 7) 
            {    
                tdeeMultiplier = 1.55; // Moderately Active
            } 
        else if (activityScore >= 4) 
            {
                tdeeMultiplier = 1.375; // Lightly Active
            } 
        else 
            {
                tdeeMultiplier = 1.2; // Sedentary
            }
        
        return tdeeMultiplier;
    }

const calculateTDEE = (userData) =>
    {
        const BMR = calculateUserBMR(userData);
        const tdeeMultiplier = determineTDEEMultiplier(userData);
        const tdee = BMR * tdeeMultiplier;
        return tdee;
    }

const handleWeightLoss = (userData) => 
    {
        const currentWeightLbs = userData.weight_in_lbs; 
        const tdee = calculateTDEE(userData);
        const safeWeightLossPerWeekLbs = 1; 
        const caloriesInOnePoundFat = 3500;
        const heightM = userData.height_in_cm / 100; // Height in meters 
        const goalWeightLbs = parseFloat(userData.goal_weight);

         // Calculating weight to lose
        const weightToLoseLbs = currentWeightLbs - goalWeightLbs;
    
        // Calculating time to reach goal weight at safe weight loss rate (in weeks)
        const timeToReachGoalWeightWeeks = weightToLoseLbs / safeWeightLossPerWeekLbs;
        
        // Calculating daily caloric deficit to achieve safe weight loss rate
        const dailyCaloricDeficit = safeWeightLossPerWeekLbs * caloriesInOnePoundFat / 7;

        console.log(`Goal weight: ${goalWeightLbs} pounds`);
        console.log(`Current weight: ${currentWeightLbs.toFixed(2)} pounds`);
        console.log(`Weight to lose: ${weightToLoseLbs.toFixed(2)} pounds`);
        console.log(`Time to reach goal weight: ${timeToReachGoalWeightWeeks.toFixed(2)} weeks`);
        console.log(`Daily caloric deficit: ${dailyCaloricDeficit.toFixed(2)}`);
    };

const handleMuscleGain = (userData) =>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      AÀ
    {
        // console.log('Handling muscle gain:', userData);
        // Add your logic here
    };

const handleMaintain = (userData) => 
    {
        //console.log('Maintaining current weight:', userData);
        // Add your logic here
    };

const handleDietingGoal = (userData) => 
    {
        if (userData.dieting_goal === 'weight_loss') 
            {
                handleWeightLoss(userData);


               

            } 
        else if (userData.dieting_goal === 'muscle_gain') 
            {
                handleMuscleGain(userData);
            } 
        else if (userData.dieting_goal === 'maintain') 
            {
                handleMaintain(userData);
            } 
        else 
            {
                console.log('Unknown dieting goal:', userData.dieting_goal);
            }
    };

module.exports = { handleDietingGoal, calculateTDEE };

