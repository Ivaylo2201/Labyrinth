import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import useProperty from "../hooks/useProperty";
import { Navigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const OwnerProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { id } = useParams();
  const auth = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const url = `/properties/${id}/`;
  const { data: property, isError } = useProperty(url);

  const fetchUserEmail = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = await auth.getUserEmail();
      const userEmail = userData?.email;
      if (property) {
        const isUserObject = typeof property.user === "object" && "email" in property.user;
        setIsOwner(isUserObject && userEmail === property.user.email);
      }
    } catch (error) {
      console.error("Error fetching user email:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auth, property]);

  useEffect(() => {
    if (property) fetchUserEmail();
  }, [fetchUserEmail, property]);

  if (isError) {
    console.error("Error fetching property data");
    return <Navigate to="/error" />;
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ClipLoader size={200} color="black" />
      </div>
    );
  }

  return !isOwner ? <Navigate to="/properties" /> : element;
};
