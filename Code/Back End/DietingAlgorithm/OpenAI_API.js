//OpenAI_API.js

const OpenAI = require('openai');

const OPENAI_API_KEY = 'sk-proj-sTAT3R1rTZCOoPpK9aq9T3BlbkFJH17WzF5hQSbWlaBakWY9';

const openai = new OpenAI({apiKey: OPENAI_API_KEY});

const getOpenAIResponse = async (userInput) => 
{
    //console.log("User Input:", userInput);
  try 
    {
        const response = await openai.chat.completions.create({model: "gpt-4-turbo",response_format: { type: "json_object" },messages: [{role: "user",content: userInput}],
        temperature: 1.25,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        });

        console.log("Response Data: ", response);
        console.log("Response Data: ", response.choices[0].message.content);

       return response.choices[0].message.content; 
    }
  catch (error) 
    {
        // handle error
        console.error('Error connecting to OpenAI:', error);
    }
};

module.exports = { getOpenAIResponse };