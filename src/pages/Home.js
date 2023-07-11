import React, { useState } from "react";
import { Box, Button, Grid, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Home = () => {
    const [url, setURL] = useState("");
    const [userPrompts, setUserPrompts] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChangeURL = (e) => {
        setURL(e.target.value);
    };

    const handleEmbedding = async () => {
        const rlt = await axios.post("http://localhost:8000/api/langchain/url_embedding", { site_url: url });
        console.log(rlt);
    };

    const handleUserPrompt = (e) => {
        setUserPrompts(e.target.value);
    };

    const handleProcess = async () => {
        const rlt = await axios.post("http://localhost:8000/api/langchain/url_embedding", { site_url: url, userPrompts: userPrompts });
        console.log(rlt);
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item sm={10}>
                    <h2>URL Scrapping & Chatbot</h2>
                    <Box display={`flex`}>
                        <TextField fullWidth label="URL" id="url_embedding" onChange={handleChangeURL} />
                        {/* <Button sx={{ marginLeft: "20px" }} variant="outlined" onClick={handleEmbedding}>
                            Embedding
                        </Button> */}
                    </Box>
                </Grid>
                <Grid mt={`20px`} item sm={10}></Grid>

                <Grid mt={`20px`} item sm={10}>
                    <Box display={`flex`}>
                        <TextField fullWidth label="QA" id="user_prompts" onChange={handleUserPrompt} />
                        <Button sx={{ marginLeft: "20px" }} variant="outlined" onClick={handleProcess}>
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
