//OpenAI_API.js

const OpenAI = require('openai');

const OPENAI_API_KEY = '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';

const openai = new OpenAI({apiKey: OPENAI_API_KEY});

const getOpenAIResponse = async (userInput) => 
{
    console.log("User Input:", userInput);
  try 
    {
        const response = await openai.chat.completions.create({model: "gpt-4",messages: [{role: "user",content: userInput}],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        });
        //console.log("Response Data: ", response);

        return response.choices[0].message.content; // or however the response is formatted
    }
  catch (error) 
    {
        // handle error
        console.error('Error connecting to OpenAI:', error);
    }
};

module.exports = { getOpenAIResponse };