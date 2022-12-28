import { Configuration, OpenAIApi } from "openai";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
});
image_url = response.data.data[0].url;