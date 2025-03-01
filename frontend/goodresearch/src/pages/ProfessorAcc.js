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
  const [serverErrors, setServerErrors] = useState([]);

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
    const errors={};
    if (form.name2.trim().length === 0) {
      errors.name2 = "name is required";
    }else if (form.name2.trim().length < 3 || form.name2.trim().length > 20) {
      errors.name2 = "Name should be between 3 to 20 characters";
  }
    if (form.area.trim().length === 0) {
      errors.area = "Research work area is required";
    }else if (form.area.trim().length < 3 || form.area.trim().length > 100) {
      errors.area = "Research experience should be between 3 to 100 characters";
  }
    setClientErrors(errors)
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = runClientValidations(); // Store result in a variable
    if (Object.keys(validationErrors).length != 0) {
      return;
    }
      setClientErrors({});
    
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
        

        profDispatch({ type: "add_prof", payload: response.data.professor });
        
        
      }
      setForm(formInitialValue);
    } catch (err) {
      console.error("Server error:", err.response?.data.errors); // Debugging step
      setServerErrors(Array.isArray(err.response.data.errors) ? err.response.data.errors : [{ msg: err.response.data.errors }]);

     
    }
  };

  return (
    <div>
      <h1> {prof.peditId ? "Edit" : "Add"} professor</h1>
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
