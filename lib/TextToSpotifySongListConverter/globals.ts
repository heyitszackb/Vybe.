import { OpenAI } from "langchain/llms/openai";

export const gpt3_5 = new OpenAI({temperature: 0.0, modelName: 'gpt-3.5-turbo'});

export const gpt4 = new OpenAI({temperature: 0.0, modelName: 'gpt-4-1106-preview'});
// export const model4turbo = new OpenAI({temperature: 0.0, modelName: 'gpt-4-1106-preview'});

// export const model4 = new OpenAI({temperature: 0.0, modelName: 'gpt-4'});