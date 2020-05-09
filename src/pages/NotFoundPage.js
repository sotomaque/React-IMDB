import React from "react";
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    
  return (
    <div style={{ position: 'absolute', top: '30%'}}>
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
