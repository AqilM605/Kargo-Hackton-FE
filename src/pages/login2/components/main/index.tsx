import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
// import { useMutation } from "react-query";
import { useAlert } from "react-alert";
import { LOGIN } from "../../api/query";

import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";
import { ModalConfirmation, ModalForm} from "../../../../components";

export const Main: React.FC = () => {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [login, { data, loading, error }] = useMutation(LOGIN, {
  //   errorPolicy: 'all'
  // });
  const { loading, error, data, refetch } = useQuery(LOGIN, {
    variables: { email: email, password: password },
  });
  if (data) {
    localStorage.setItem("token", data.loginUser.token);
    alert.success("Successfully Login");
    window.location.href = "/";
  }
  return (
    <>
      {
        error &&
        error.message
      }
      <div className="text-center py-4" style={{ backgroundColor: "#282c34" }}>
        <Container>
          <h3 className="text-white">Login 2</h3>
          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="primary"
              type="submit"
              onClick={e => {
                e.preventDefault();
                refetch();
                // login({
                //   variables: {
                //     email: email, password: password
                //   }
                // });
              }}
            >
              Submit
            </Button>
          </Form>


        </Container>


        //Modal Confirmation Sample Use
        {/*<ModalConfirmation*/}
        {/*    isShowing={false}*/}
        {/*    onSubmit={()=>{}}*/}
        {/*    onClose={()=>{}}*/}
        {/*    message="Are you sure wanna delete this carrot ?"*/}
        {/*    cancelButton="Cancel"*/}
        {/*    okButton="Delete"*/}
        {/*/>*/}

        <ModalForm footer={true} isShowing={false} size="2xl" title="Profile">

          adasdasdasd

        </ModalForm>

      </div>
    </>
  );
};
