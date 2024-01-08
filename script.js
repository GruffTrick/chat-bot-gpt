import { config } from "dotenv";
config();

import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI({ 
    apiKey: process.env.API_KEY 
});
console.log("API_KEY: " + process.env.API_KEY)

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


userInterface.prompt()


// // Chat Completion Respone
// userInterface.on("line", async input => {
// const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{"role": "user", "content": input}],
//   });
//   console.log(chatCompletion.choices[0].message.content);
// });

// Streaming Response
    userInterface.on("line", async input => {
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": input}],
            stream: true,
        });
        for await (const part of stream) {
            // if (part.choices[0].delta.content == undefined) {break;} // clean trailing undefined
            process.stdout.write(part.choices[0]?.delta?.content || "\n");
        }
        // Reopens prompt once response is written
        userInterface.prompt();
    });
