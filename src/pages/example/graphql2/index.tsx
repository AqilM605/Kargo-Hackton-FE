import React, { useState } from "react";
import {
  useQuery,
  gql
} from "@apollo/client";
import { Row, Col, Container, Card, Table, Input, Button } from "reactstrap";

const USER = gql`
  query{
    users {
        id,
        email,
        firstName,
        lastName,
        role
    }
  }
`;

const User = () => {
  const { loading, error, data, refetch } = useQuery(USER, {
    pollInterval: 1000
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Button onClick={() => { refetch(); console.log("refetch") }}>Refetch!</Button>
      <Table striped bordered responsive={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>FirstName</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            data.users.map(({ id,email,firstName,lastName,role }: any, key: number) => (
              <tr key={id}>
                <td>
                  {key + 1}
                </td>
                <td>{email}</td>
                <td>{`${firstName} ${lastName}`}</td>
                <td>{role}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

const GraphQLPage2: React.FC = () => {
  return (
    <div>
      <h1>Graphql</h1>
      <Container>
        <User />
      </Container>

    </div>
  );
};

export default GraphQLPage2;
