import React from "react";
import { Link } from "react-router-dom";

const FooterBar = props => {
  return (
    <div className="footer">
      <p>
        &copy; Copyright 2018 by{" "}
        <Link className="login-link" to="/main">
          <b>Dcordtroller Team</b>
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
};

export default FooterBar;
