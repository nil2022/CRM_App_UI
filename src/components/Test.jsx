import { Grid } from "@mui/material";
import React from "react";

const Test = () => {
    return (
        <Grid mt={10} height={"100vh"} width={"100%"}>
            {/* MAke my Grid in center */}
            {/* <Grid container  justifyContent={"center"}>
                <Grid xs={12} md={3} item border={1}>
                    <h1>Test1</h1>
                </Grid>
                <Grid xs={12} md={3} item border={1}>
                    <h1>Test2</h1>
                </Grid>
                <Grid xs={12} md={3} item border={1}>
                    <h1>Test3</h1>
                </Grid>
                <Grid xs={12} md={3} item border={1}>
                    <h1>Test4</h1>
                </Grid>
            </Grid> */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "start" }}>
                <div style={{
                    border: "1px solid red", width: "400px"
                }}>1</div>
                <div style={{
                    border: "1px solid red", width: "400px"
                }}>2</div>
                <div style={{
                    border: "1px solid red", width: "400px"
                }}>3</div>
                <div style={{
                    border: "1px solid red", width: "400px"
                }}>4</div>
            </div>
        </Grid>
    );
};

export default Test;
