import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function ProjectDetail() {
    const {user2State}=useContext(AuthContext)
  const { id } = useParams();
  const users = user2State.data.find((ele) => ele._id == id);
  if (!users) {
    return <p> data is missing </p>;
  }
  return (
    <div>
    
      <p> Name:{users?.name}</p>
      <p> Institute name: {users?.instituteName}</p>
      <p> Degree:{users?.degree}</p>
      <p> Department:{users?.department}</p>
      <p> Research area:{users?.research}</p>
      <p> Work area:{users?.workarea}</p>
      <p> Professor under whom student applied:{users?.name2}</p>


    </div>
  );
}
