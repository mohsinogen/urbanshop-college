import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history, width }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        style={{
          width: width <= 470 ? "80%" : "",
        }}
      ></Form.Control>

      <Button type="submit" variant="dark" className="p-2 ml-3">
        {width <= 470 ? <i className="fas fa-search p-1"></i> : "Search"}
      </Button>
    </Form>
  );
};

export default SearchBox;
