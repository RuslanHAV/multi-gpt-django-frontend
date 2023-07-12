import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
const backend_api_url = process.env.REACT_APP_SERVER_API_URL;

const Home = () => {
    const [url, setURL] = useState("");
    const [userPrompts, setUserPrompts] = useState("");
    const [upload, setUpload] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleChangeURL = (e) => {
        setURL(e.target.value);
    };

    const handleEmbedding = async () => {
        const rlt = await axios.post(backend_api_url + "/langchain/url_embedding", { site_url: url });
        console.log(rlt);
    };

    const handleUserPrompt = (e) => {
        setUserPrompts(e.target.value);
    };

    const handleProcess = async () => {
        const rlt = await axios.post(backend_api_url + "/langchain/chat", { site_url: url, userPrompts: userPrompts });
        console.log(rlt);
    };

    const handleFileSelect = (evt) => {
        console.log('upload = ',upload)
        if (upload != null) {
            setUpload([...upload, ...evt.target.files[0]]);
        } else {
            console.log("evt.target.files[0] = ", evt.target.files[0]);
            setUpload(evt.target.files[0]);
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const data = new FormData();
        data.set("newFile[]", upload);
        console.log("upload = ", upload);
        // const res = await fetch(backend_api_url + "/langchain/pdf_embedding", {
        //     method: "POST",
        //     body: data,
        // });
        // console.log("res = ", res.status);
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Box display={`flex`} gap={`60px`}>
                    <Box minWidth={`30vw`}>
                        <Box>
                            <h2>URL</h2>
                            <Box display={`flex`}>
                                <TextField fullWidth label="URL" id="url_embedding" onChange={handleChangeURL} />
                                <Button sx={{ marginLeft: "20px" }} variant="outlined" onClick={handleEmbedding}>
                                    URL Embedding
                                </Button>
                            </Box>
                        </Box>
                        <Box mt={`20px`}>
                            <h2>PDF</h2>
                            <form onSubmit={handleSubmit}>
                                <input type="file" name="fileToUpload" multiple onChange={handleFileSelect} />
                                <Button type="submit" sx={{ marginLeft: "20px" }} variant="outlined">
                                    PDF Embedding
                                </Button>
                            </form>
                        </Box>
                    </Box>
                    <Box minWidth={`50vw`}>
                        <Box>
                            <h2>Chat </h2>
                            <Box display={`flex`}>
                                <TextField fullWidth label="QA" id="user_prompts" onChange={handleUserPrompt} />
                                <Button sx={{ marginLeft: "20px" }} variant="outlined" onClick={handleProcess}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </>
    );
};

export default Home;
