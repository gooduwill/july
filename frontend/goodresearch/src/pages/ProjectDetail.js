import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
/**
 * ProjectDetail - A component for displaying the details of a specific project/application.
 * 
 * This component retrieves and displays detailed information about a specific project or application, 
 * based on the `id` parameter from the URL. It fetches the relevant user data from the `user2State` context 
 * and displays fields like the applicant's name, institute, degree, department, research area, work area, 
 * and the professor under whom the student applied. If the user data is not found, an error message is displayed.
 * 
 * Features:
 * - Retrieves project/application data using the `id` from the URL parameters.
 * - Displays detailed information of the project/application, including personal and academic information.
 * - Handles the case where no data is found by showing a message indicating that the data is missing.
 * 
 * Dependencies:
 * - `useContext` to access the `user2State` context and retrieve the user data.
 * - `useParams` to extract the `id` from the URL and find the corresponding user.
 * 
 * Intended to be used to view detailed information about a specific project or application in the system.
 */

export default function ProjectDetail() {
  const { user2State } = useContext(AuthContext)
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
