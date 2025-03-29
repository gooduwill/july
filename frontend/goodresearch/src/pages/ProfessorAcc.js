import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axiosInstance from "./axiosInstance";

export default function ProfessorAcc() {
  const navigate = useNavigate();
  const { profDispatch, prof, userState } = useContext(AuthContext);

  const formInitialValue = {
    name2: "",
    area: "",
    email: userState.user.email,
    image: null,
    workarea: "",
  };

  const [form, setForm] = useState(formInitialValue);
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    if (prof.peditId) {
      const profs = prof.data.find((ele) => ele._id === prof.peditId);
      if (profs) {
        setForm({
          name2: profs.name2,
          area: profs.area,
          email: profs.email,
          image: null,
          workarea: profs.workarea, // Image upload will be handled separately
        });
      }
    }
  }, [prof.peditId, prof.data]);

  // Client-side validation
  const runClientValidations = () => {
    const errors = {};
    if (form.name2.trim().length === 0) {
      errors.name2 = "Name is required";
    } else if (form.name2.trim().length < 3 || form.name2.trim().length > 20) {
      errors.name2 = "Name should be between 3 to 20 characters";
    }
    if (form.area.trim().length === 0) {
      errors.area = "Research work area is required";
    } else if (form.area.trim().length < 3 || form.area.trim().length > 100) {
      errors.area = "Research experience should be between 3 to 100 characters";
    }
    if (form.workarea.trim().length === 0) {
      errors.workarea = "Research work area is required";
    } else if (form.workarea.trim().length < 3 || form.workarea.trim().length > 100) {
      errors.workarea = "Research experience should be between 3 to 100 characters";
    }
    setClientErrors(errors);
    return errors;
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = runClientValidations();
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }
    setClientErrors({});

    try {
      const formData = new FormData();
      formData.append("name2", form.name2);
      formData.append("area", form.area);
      formData.append("email", userState.user.email);
      formData.append("workarea", form.workarea);
      if (form.image) {
        formData.append("image", form.image);
      }

      let response;
      if (prof.peditId) {
        response = await axiosInstance.put(
          `/users/prof/${prof.peditId}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        profDispatch({ type: "update_prof", payload: response.data });
      } else {
        response = await axiosInstance.post("/users/prof", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
        profDispatch({ type: "add_prof", payload: response.data.professor });
      }

      setForm(formInitialValue);
      setTimeout(() => navigate("/professors"), 500); // Redirect to professor list after submission
    } catch (err) {
      console.error("Server error:", err.response?.data.errors);
      setServerErrors(
        Array.isArray(err.response.data.errors)
          ? err.response.data.errors
          : [{ msg: err.response.data.errors }]
      );
    }
  };

  return (
    <div>
      <h1>{prof.peditId ? "Edit" : "Create"} Professor Account</h1>

      {serverErrors.length > 0 && (
        <div>
          {serverErrors.map((error, index) => (
            <p key={index} style={{ color: "blue" }}>
              {error.msg}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-acc1">
        <div className="form-acc">
          <label>
            Enter your Name
            <input
              type="text"
              name="name2"
              value={form.name2}
              onChange={(e) => setForm({ ...form, name2: e.target.value })}
              placeholder="Enter your name"
            />
            {clientErrors.name2 && <span style={{ color: "red" }}>{clientErrors.name2}</span>}
          </label>
        </div>

        <div className="form-acc">
          <label className="label-acc">
            Enter Research Work
            <textarea
              name="area"
              className="container-acc"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              placeholder="Enter Research work"
            />
            {clientErrors.area && <span style={{ color: "red" }}>{clientErrors.area}</span>}
          </label>
        </div>

        {/* Image Upload Section */}
        <div className="form-acc">
          <label>
            Upload Profile Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
          </label>
        </div>


        <div className="form-acc">
          <label>
            Enter workarea
            <input
              type="text"
              name="workarea"
              value={form.workarea}
              onChange={(e) => setForm({ ...form, workarea: e.target.value })}
              placeholder="Enter your workarea"
            />
            {clientErrors.workarea && <span style={{ color: "red" }}>{clientErrors.workarea}</span>}

          </label>
        </div>
        <div style={{ textAlign: "center" }}>
          <input type="submit" className="subbuttonacc1" />
        </div>
      </form>
    </div>
  );
}
