import React, { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
//import { format } from "date-fns";
import AuthContext from "../context/AuthContext";
import "../App.css"
import axiosInstance from "./axiosInstance";


function Project1() {
    const {user2Dispatch,depart,applypost,editData,prof,profDispatch}=useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    applypost: "",
    instituteName: "",
    edate: "",
    degree: "",
    name2:"",
    email:"",
    id: Date.now(),
    department: "",
    research: "",
    workarea: [],
    ResearchExp: "",
    attachment: null,
    attachment2: null,
  });
  const [status, setStatus] = useState("");
  


  /*useEffect(() => {
    if (editData) {
      // If there's editData, prefill the form fields
      setForm({
        ...editData, // This will set the form values to the existing values
      });
    }
  }, [editData]); // Only run when editData changes */
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


  /*const handleChange = (event) => {
    const { name, value, files } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: files ? files[0] : value,
    }));

    if (files) {
      console.log("File selected:", files[0]);
    }

  };*/
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setForm((currentForm) => {
        let updatedForm = {
            ...currentForm,
            [name]: files ? files[0] : value,
        };

        // Auto-fill email when a professor is selected
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
      formData.append("name2",form.name2);
      formData.append("email",form.email);
      formData.append("department", form.department);
      formData.append("research", form.research);
      formData.append("workarea", form.workarea);
      formData.append("id", form.id);
      formData.append("ResearchExp", form.ResearchExp);
      formData.append("attachment", form.attachment);
      formData.append("attachment2", form.attachment2);

      // Log the FormData contents
      // for (const [key, value] of formData.entries()) {
      //  console.log(`${key}:`, value);
      //}

      try {
        if (editData) {
          // If editing, send a PUT request to update the project
          const response = await axiosInstance.put(
            `/formsend1/${editData._id}`,
            formData,
            {
              headers: {Authorization:localStorage.getItem('token')},
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
              headers: { "Content-Type": "multipart/form-data" },
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
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>Select post applied</label>
          <select
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
            <input
              type="text"
              name="instituteName"
              value={form.instituteName}
              onChange={handleChange}
              placeholder="Enter institute Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="dateofbirth">
            Enter your Date of Birth
            <input
              type="date"
              value={form.edate}
              name="edate"
              onChange={handleChange}
              placeholder="Enter date of Birth"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="degree">
            Enter Highest degree:
            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Enter highest degree"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>Select Professor</label>
          <select value={form.name2 || ""} name="name2" onChange={handleChange}>
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
          type="text"
            value={form.email}
            name="email"
            
          />
           
          
        </div>
        <div className="form-group">
          <label>Select department stream</label>
          <select
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
          <select value={form.research} name="research" onChange={handleChange}>
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
          <select value={form.workarea} name="workarea" onChange={handleChange}>
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
            <textarea
              type="text"
              name="ResearchExp"
              value={form.ResearchExp}
              style={{width:"390px"}}
              onChange={handleChange}
              placeholder="Write about Research Experience"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Upload CV:
            <input
              type="file"
              name="attachment"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload Photo:
            <input
              type="file"
              name="attachment2"
              onChange={handleChange}
              required
            />
          </label>
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
