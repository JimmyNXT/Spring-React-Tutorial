import React, { Component } from "react";
import Container from "./Container";
import Footer from "./Footer";
import "./App.css";
import { getAllStudents } from "./client";
import AddStudentForm from "./forms/AddStudentForm";
import { Avatar, Spin, Table, Modal, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { errorNotification } from "./Notification";

const getIndicatorIcon = () => (
  <LoadingOutlined style={{ fontSize: 24 }} spin />
);

class App extends Component {
  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisable: false,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  openIsAddStudentModal = () => {
    this.setState({ isAddStudentModalVisable: true });
  };

  closeIsAddStudentModal = () => {
    this.setState({ isAddStudentModalVisable: false });
  };

  fetchStudents = () => {
    this.setState({
      isFetching: true,
    });

    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          //console.log(students);
          this.setState({
            students: students,
            isFetching: false,
          });
        })
      )
      .catch((error) => {
        // console.log(error.error);
        const message = error.error.httpStatus;
        const description = error.error.message;
        //errorNotification(message, message);
        errorNotification(message, description);
        this.setState({
          isFetching: false,
        });
      });
  };

  render() {
    const { students, isFetching, isAddStudentModalVisable } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title="Add new Students"
          visible={isAddStudentModalVisable}
          onOk={this.closeIsAddStudentModal}
          onCancel={this.closeIsAddStudentModal}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              this.closeIsAddStudentModal();
              this.fetchStudents();
            }}
            onFailure={(err) => {
              console.log(err.error);
              errorNotification("Error", err.error.message);
            }}
          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={this.openIsAddStudentModal}
        />
      </div>
    );

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()} />
        </Container>
      );
    }

    if (students && students.length) {
      const columns = [
        {
          title: "",
          key: "Avatar",
          render: (text, student) => (
            <Avatar size="large">{`${student.firstName
              .charAt(0)
              .toUpperCase()}${student.lastName
              .charAt(0)
              .toUpperCase()}`}</Avatar>
          ),
        },
        {
          title: "StudentId",
          dataIndex: "studentId",
          key: "studentId",
        },
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "firstName",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
      ];

      return (
        <Container>
          <Table
            style={{ marginBottom: "100px" }}
            dataSource={students}
            columns={columns}
            pagination={false}
            rowKey="studentId"
          />
          {commonElements()}
        </Container>
      );
    } else {
      return (
        <Container>
          <Empty description={<h1>No students found</h1>} />
          {commonElements()}
        </Container>
      );
    }
  }
}

export default App;
