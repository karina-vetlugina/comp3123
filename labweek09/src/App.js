import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function Certificate({ courseTitle, labTitle, studentId, studentName, college }) {
  return (
    <>
      <img src={logo} className="App-logo" alt="React logo" />
      <h1 style={{ margin: 0 }}>{courseTitle}</h1>
      <h2 style={{ fontWeight: 700, marginTop: 16 }}>{labTitle}</h2>
      <p style={{ fontWeight: 700, marginTop: 24 }}>{studentId}</p>
      <p style={{ fontWeight: 700, marginTop: 8 }}>{studentName}</p>
      <p style={{ marginTop: 20 }}>{college}</p>
    </>
  );
}

export default function App() {
  const [data] = useState({
    courseTitle: "Welcome to Fullstack Development - I",
    labTitle: "React JS Programming Week09 Lab exercise",
    studentId: "101501883",
    studentName: "Karina Vetlugina",
    college: "George Brown College, Toronto",
  });

  return (
    <div className="App">
      <header className="App-header">
        <Certificate
          courseTitle={data.courseTitle}
          labTitle={data.labTitle}
          studentId={data.studentId}
          studentName={data.studentName}
          college={data.college}
        />
      </header>
    </div>
  );
}