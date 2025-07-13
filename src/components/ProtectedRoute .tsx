import React, {type JSX} from "react";
import { Navigate, useLocation  } from "react-router-dom";

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
