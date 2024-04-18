// Adding more context to the weird sounding answers

const formartQuestion10 = (userData) => 
    {
        // Check what the array contains and return the corresponding sentence
        const hasBack = userData.includes('back');
        const hasKnees = userData.includes('knees');

        if (hasBack && hasKnees) 
            {
                return "I struggle with pain in both my knees and back.";
            } 
        else if (hasBack) 
            {
                return "I struggle with back pain.";
            } 
        else if (hasKnees) 
            {
                return "I struggle with pain in my knees.";
            } 
        else 
            {
                return "No specific pain area mentioned."; // Or any other default message
            }
    }


const formartAnswers = (userData) => 
    {
        switch(userData) 
            {
                // Question 
                case 'easy_gain_hard_lose':
                    return "I have trouble gaining muscle or body fat";
                    break;
                case 'effortless_change':
                    return "I gain and lose weight without effort";
                    break;
                case 'easy_gain_hard_lose':
                    return "I gain weight easily but find it hard to lose";
                    break;
                // Question 4


                // Question 8
                case 'out_of_breath':
                    return "I'm so out of breath I can't talk";
                    break;
                case 'somewhat_out_of_breath':
                    return "I'm somewhat out of breath but can talk";
                    break;
                case 'ok_after_one_flight':
                    return "I'm OK after one flight of stairs";
                    break;
                case 'easily_walk_up_flights':
                    return "I can easily walk up a few flights of stairs";
                    break;

                // Question 10
                case 'out_of_breath':
                    return "I'm so out of breath I can't talk";
                    break;
                case 'somewhat_out_of_breath':
                    return "I'm somewhat out of breath but can talk";
                    break;
                case 'ok_after_one_flight':
                    return "I'm OK after one flight of stairs";
                    break;
                case 'easily_walk_up_flights':
                    return "I can easily walk up a few flights of stairs";
                    break;

                // Question 17
                case 'rarely':
                    return "Not often, I am not big on sweets";
                    break;
                case 'semi-regularly':
                    return "3 - 5 times a week";
                    break;
                case 'daily':
                    return "Pretty much everyday";
                    break;
            }
    }

module.exports = { formartAnswers, formartQuestion10 };