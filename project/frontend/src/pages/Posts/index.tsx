import React from "react";
import { Component } from "react";
import CustomizedTable from "./components/PostsTable";
import Modal from "./components/ModalWindow";

class Posts extends Component {
  render() {
    return (
      <div>
        <CustomizedTable />
      </div>
    );
  }
}

// export default Welcome
export { Posts };
