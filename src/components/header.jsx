import React from 'react';


function Header({todosListSize, user, logoutEvent}) {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="navbar-brand" href="#">Commotion</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <span className="navbar-text">
        {user.userName} ({todosListSize})<div className="nav-link" onClick={() => logoutEvent(user)}>Logout</div>
      </span>

    </div>
  </div>
</nav>

    );
}

export default Header;

