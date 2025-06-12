import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "../App.css"
import axiosInstance from "./axiosInstance";
/**
 * Project1 - A component for submitting and editing an application form for a project or academic post
 * 
 * This component allows users to fill out and submit an application form. It can also be used to edit an existing
 * application by pre-filling the form fields with the provided data. The form includes fields like personal information, 
 * educational background, research experience, and file attachments. The component sends the form data to a server via 
 * a POST or PUT request depending on whether the user is creating a new application or editing an existing one.
 * 
 * Features:
 * - Displays a form to apply for a project or academic position.
 * - Allows users to select and autofill professor email based on selected professor.
 * - Supports file uploads for CV and photo.
 * - Submits data to the server and updates the user state via context dispatch.
 * - Displays status messages to inform the user about the submission result.
 * 
 * Dependencies:
 * - `useContext` to access data from the `AuthContext`, including professor data, department information, and application posts.
 * - `useState` to manage form data, submission status, and other state variables.
 * - `useEffect` to populate the form with data if editing an existing application.
 * - `axiosInstance` for sending the POST/PUT request to the server with form data.
 * 
 */

function Project1() {
  const { user2Dispatch, depart, applypost, editData, prof, profDispatch } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    applypost: "",
    instituteName: "",
    edate: "",
    degree: "",
    name2: "",
    email: "",
    id: Date.now(),
    department: "",
    research: "",
    workarea: [],
    ResearchExp: "",
    attachment: null,
    attachment2: null,
  });
  const [status, setStatus] = useState("");



    useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
      });

      // Auto-fill professor email in edit mode
      const selectedProf = prof?.data.find((ele) => ele.name2 === editData.name2);
      if (selectedProf) {
        setForm((currentForm) => ({
          ...currentForm,
          email: selectedProf.email,
        }));
      }
    }
  }, [editData, prof?.data]);


  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setForm((currentForm) => {
      let updatedForm = {
        ...currentForm,
        [name]: files ? files[0] : value,
      };

      // Auto-fill email when a professor is selected from dropdown
      if (name === "name2") {
        const selectedProf = prof?.data.find((ele) => ele.name2 === value);
        if (selectedProf) {
          updatedForm.email = selectedProf.email; // Assuming professor object has an email field
        } else {
          updatedForm.email = ""; // Reset email if no professor found
        }
      }

      return updatedForm;
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Debug log to check form data before submitting
    console.log("Form data before submission:", form);

    if (form.name && form.instituteName && form.degree && form.attachment) {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("applypost", form.applypost);
      formData.append("instituteName", form.instituteName);
      formData.append("edate", form.edate);
      formData.append("degree", form.degree);
      formData.append("name2", form.name2);
      formData.append("email", form.email);
      formData.append("department", form.department);
      formData.append("research", form.research);
      formData.append("workarea", form.workarea);
      formData.append("id", form.id);
      formData.append("ResearchExp", form.ResearchExp);
      formData.append("attachment", form.attachment);
      formData.append("attachment2", form.attachment2);

      try {
        if (editData) {
          // If editing, send a PUT request to update the project
          const response = await axiosInstance.put(
            `/formsend1/${editData._id}`,
            formData,
            {
              headers: { Authorization: localStorage.getItem('token') },
            }
          );

          // Dispatch update_user action with the updated data
          user2Dispatch({ type: "update_user", payload: response.data });
          setStatus("Project updated successfully!");
        } else {
          // If adding, send a POST request to add the project
          const response = await axiosInstance.post(
            "/formsend1",
            formData,
            {
              headers: { Authorization: localStorage.getItem('token') },
            }
          );

          // Dispatch add_user action to add the new user/project to the list
          user2Dispatch({ type: "add_user", payload: response.data });
          setStatus("Project added successfully!");
        }
      } catch (error) {
        console.error("Error response:", error.response?.data); // Log error response from server
        setStatus("Failed to send email with file.");
      }
    } else {
      setStatus("Please fill out all fields and upload a file.");
    }
  };

  return (
    <div>
      <h2>{editData ? "Edit Application Form" : "Application Form"}</h2>
      <h1>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="form-group1"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="name">
            Enter your name:
          </label>
          <input
              class="form-control"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
        </div>
        <div className="form-group">
          <label>Select post applied</label>
          <select
            class="form-control"
            value={form.applypost}
            name="applypost"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {applypost?.map((ele) => (
              <option key={ele._id} value={ele.applypost}>
                {ele.applypost}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="instituteName">
            Enter your institute name:
            </label>

            <input 
              class="form-control"
              type="text"
              name="instituteName"
              value={form.instituteName}
              onChange={handleChange}
              placeholder="Enter institute Name"
              required
            />
        </div>
        <div className="form-group">
          <label htmlFor="dateofbirth">
            Enter your Date of Birth
            </label>
            <input
              class="form-control"
              type="date"
              value={form.edate}
              name="edate"
              onChange={handleChange}
              placeholder="Enter date of Birth"
              required
            />
          
        </div>
        <div className="form-group">
          <label htmlFor="degree">
            Enter Highest degree:
            </label>

            <input
              class="form-control"
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Enter highest degree"
              required
            />
        </div>
        <div className="form-group">
          <label>Select Professor</label>
          <select class="form-control" value={form.name2 || ""} name="name2" onChange={handleChange}>
            <option value="">Select</option>
            {prof?.data?.map((ele) => (
              <option key={ele._id} value={ele.name2}>
                {ele.name2}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Selected Professor email id</label>
          <input
            class="form-control"
            type="text"
            value={form.email}
            name="email"
            readonly
            
          />


        </div>
        <div className="form-group">
          <label>Select department stream</label>
          <select
            className="form-control"
            value={form.department}
            name="department"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {depart?.map((ele) => (
              <option key={ele._id} value={ele.department}>
                {ele.stream}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select research</label>
          <select className="form-control" value={form.research} name="research" onChange={handleChange}>
            <option value="">Select</option>
            {depart
              .find((ele) => ele.stream == form.department)
              ?.research?.map((ele2, index) => (
                <option key={ele2.index} value={ele2.topic}>
                  {ele2.topic}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select work area</label>
          <select className="form-control" value={form.workarea} name="workarea" onChange={handleChange}>
            <option value="">Select</option>
            {depart
              .find((ele) => ele.stream === form.department)
              ?.research?.find((ele1) => ele1.topic === form.research)
              ?.workarea?.map((ele2, index) => (
                <option key={index} value={ele2}>
                  {ele2}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ResearchExp">
            Write about Research Experience:
            </label>
            <textarea
              class="form-control"
              type="text"
              name="ResearchExp"
              value={form.ResearchExp}
              style={{ width: "390px" }}
              onChange={handleChange}
              placeholder="Write about Research Experience"
              required
            />
        </div>

        <div className="form-group">
          <label>
            Upload CV:
            </label>
            <input
              class="form-control"
              type="file"
              name="attachment"
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>
            Upload Photo:
            </label>
            <input
              class="form-control"
              type="file"
              name="attachment2"
              onChange={handleChange}
              required
            />
        </div>

        <br />
        <button type="submit" className="submit-button-project1">
          Submit
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}

export default Project1;
