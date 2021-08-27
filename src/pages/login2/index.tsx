import React from "react";
import {Main} from "./components/main";
import {Container} from "react-bootstrap";
import {NavigationBar} from "../../components/navbar";

const Login: React.FC = () => {
    return (
        <div>
            <NavigationBar/>
            <Container>
                <Main/>
            </Container>
        </div>

    );
};

export default Login;
