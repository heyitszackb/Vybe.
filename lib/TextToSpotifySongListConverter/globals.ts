import { OpenAI } from "langchain/llms/openai";

export const model = new OpenAI({temperature: 0.0, modelName: 'gpt-3.5-turbo'});

export const model4 = new OpenAI({temperature: 0.0, modelName: 'gpt-4'});