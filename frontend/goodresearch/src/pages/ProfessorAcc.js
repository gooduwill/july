import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


export default function ProfessorAcc() {
  const navigate = useNavigate();
  
  const {profDispatch, prof,userState}=useContext(AuthContext)
  
const formInitialValue = {
  name2: "",
  area: "",
  email:userState.user.email,
  
 };
const [form, setForm] = useState(formInitialValue);
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    if (prof.peditId) {
      const profs = prof.data.find((ele) => ele._id == prof.peditId);
      setForm({
        name2: profs.name2,
        area: profs.area,
      });
    }
  }, [prof.peditId, prof.data]);
  const runClientValidationErrors = {};
  const runClientValidations = () => {
    if (form.name2.trim().length === 0) {
      runClientValidationErrors.name2 = "name is required";
    }
    if (form.area.trim().length === 0) {
      runClientValidationErrors.area = "Research work area is required";
    }
    return runClientValidationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = runClientValidations(); // Store result in a variable
    if (Object.keys(validationErrors).length != 0) {
      setClientErrors(validationErrors);
    } else {
      setClientErrors({});
    }
    try {
      let response;

      if (prof.peditId) {
        response = await axios.put(
          `http://localhost:3010/users/prof/${prof.peditId}`,
          form
        );
        profDispatch({ type: "update_prof", payload: response.data });
      } else {
        response = await axios.post("http://localhost:3010/users/prof", form,{headers:{Authorization:localStorage.getItem('token')}});
        profDispatch({ type: "add_prof", payload: response.data });
      }
      setForm(formInitialValue);
    } catch (err) {
      console.error("Server error:", err.response?.data); // Debugging step
    }
  };

  return (
    <div>
      <h1> {prof.peditId ? "Edit" : "Add"} professor</h1>
         
      <form onSubmit={handleSubmit} className="form-acc1">
        
        <div className="form-acc">
        <label>
          Enter your Name
          <input
            type="text"
            name="name2"
            value={form.name2}
            onChange={(e) => {
              setForm({ ...form, name2: e.target.value });
            }}
            placeholder="Enter your name"
          />
          {clientErrors.name2 && (
            <span style={{ color: "red" }}>{clientErrors.name2}</span>
          )}
        </label>
        </div>
        <div className="form-acc">
        <label className="lable-acc">
          Enter Research work
          
            <textarea
            type="text"
            name="area"
            className="container-acc"
            value={form.area}
            onChange={(e) => {
              setForm({ ...form, area: e.target.value });
            }}
            placeholder="Enter Research work"
          />
          {clientErrors.area && (
            <span style={{ color: "red" }}>{clientErrors.area}</span>
          )}
          <br />
          <div style={{textAlign: "center"}}>
          <input type="submit" className="subbuttonacc1" />
          </div>
         </label>
        </div>
      </form>
    </div>
    
  );
}
