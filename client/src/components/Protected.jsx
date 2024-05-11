import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  const { currentUser } = useSelector((state) => state.user);

  return <>{currentUser ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default Protected;
