import { Configuration, OpenAIApi } from "openai";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

// set up a response to let user know that the server is working (status is ok)
app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello from Vizard",
    })
});

const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
});
image_url = response.data.data[0].url;


app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createImage({
            prompt: `${prompt}`,
            n: 1,
            size: "1024x1024",
        });
        image_url = response.data.data[0].url;

        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log("Server running on port http://localhost:5000"));