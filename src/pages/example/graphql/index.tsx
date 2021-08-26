import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";
import { Row, Col, Container, Card, Table, Input, Button } from "reactstrap";

const BUSSINESS = gql`
  query {
    allBusinesses {
      id
      name
      tag
      description
    }
  }
`;

const Bussiness = () => {
  const { loading, error, data, refetch } = useQuery(BUSSINESS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Button onClick={() => { refetch(); console.log("refetch") }}>Refetch!</Button>
      <Table striped bordered responsive={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Tag</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            data.allBusinesses.map(({ id, name, tag, description }: any, key: number) => (
              <tr key={id}>
                <td>
                  {key + 1}
                </td>
                <td>{name}</td>
                <td>{tag}</td>
                <td>{description}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )

}

const INSERT_BUSSINESS = gql`
  mutation addBussiness($description: String!, $name: String!, $tag: String!) {
    createBussiness (
      description: $description,
          name: $name,
          tag: $tag
    ){
      id
      name
      tag
      description
    }
  }
`;

const InputBussiness = ({
  onSubmit
}: any) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [addBussiness, { data, loading, error }] = useMutation(INSERT_BUSSINESS, { errorPolicy: 'all' });

  if (loading) return <>'Submitting...'</>;
  // if (error) return <p>Error :(</p>;
  // if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <div>
      {
        error &&
        error.message
      }
      <form
        onSubmit={e => {
          e.preventDefault();
          addBussiness({
            variables: {
              description: description,
              name: name,
              tag: tag
            }
          });
          // input.value = '';
        }}
      >
        <Input
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Input
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Input
          name="tag"
          onChange={(e) => setTag(e.target.value)}
        />
        <br />
        <Button type="submit">Add Todo</Button>
      </form>
    </div>
  );
}

const GraphQLPage: React.FC = () => {
  return (
    <div>
      <h1>Graphql</h1>
      <Container>
        <InputBussiness onSubmit />
        <br />
        <Bussiness />
      </Container>

    </div>
  );
};

export default GraphQLPage;
