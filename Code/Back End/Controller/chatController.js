// chatController.js


const { getOpenAIResponse } = require('../OpenAI_API'); // Adjust the path as needed
const { questionChecker, predefinedAnswers } = require('../questionChecker'); // Import your question checking logic

exports.sendMessage = async (req, res) => {
    const { message, userId } = req.body;
    console.log("User Input:", message, "UserID:", userId);

    questionChecker(message, userId);
  
    // First check if the question is one of the predefined ones
    const predefinedResponse = questionChecker(message, userId);

    if (predefinedResponse) 
    {
        console.log("Predefined Response:", predefinedResponse);
        // Send back the predefined response without calling the OpenAI API
        res.json({ message: predefinedResponse });
    } 
    else {
        const botResponse = await getOpenAIResponse(message);
        console.log("Bot Response:", botResponse);
        
        if (botResponse) {
            res.json({ message: botResponse });
        } else {
            res.status(500).send('Error fetching response from OpenAI');
        }
    }
};

