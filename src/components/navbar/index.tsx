import {Button, Container, Navbar} from "react-bootstrap";
import React from "react";


export const NavigationBar: React.FC = () => {
    return (

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">LMS |</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="row">
                        <div className="col"><Button className="btn bg-transparent text-black-50 btn btn-outline-light" onClick={() => {
                        }}>Shipments</Button></div>
                        <div className="col"><Button className="btn bg-transparent  text-black-50 btn btn-outline-light" onClick={() => {
                        }}>Trucks</Button></div>
                        <div className="col"><Button className="btn bg-transparent text-black-50 btn btn-outline-light" onClick={() => {
                        }}>Drivers</Button></div>

                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

