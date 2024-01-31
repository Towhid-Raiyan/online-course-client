import React from "react";
import ManageCourse from "./ManageCourse";
import Container from "../../../Layout/Container/Container";

const Home = () => {
    return (
        <Container>
            <div>{/* cards for dashboard with charts */}</div>
            <div className="mt-24">
                <ManageCourse />
            </div>
        </Container>
    );
};

export default Home;
