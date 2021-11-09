import React, { Component } from "react";
import Container from "./Container";
import Footer from "./Footer";
import "./App.css";
import { getAllStudents } from "./client";
import AddStudentForm from "./forms/AddStudentForm";
import { Avatar, Spin, Table, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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

    getAllStudents().then((res) =>
      res.json().then((students) => {
        this.setState({
          students: students,
          isFetching: false,
        });
      })
    );
  };

  render() {
    const { students, isFetching, isAddStudentModalVisable } = this.state;

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
            />
          </Modal>
          <Footer
            numberOfStudents={students.length}
            handleAddStudentClickEvent={this.openIsAddStudentModal}
          />
        </Container>
      );
    } else {
      return (
        <div>
          <h1>No students found</h1>
        </div>
      );
    }
  }
}

export default App;
