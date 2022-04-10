import React from "react";
import "./style.scss";

function BoardBar() {
  return (
    <>
      {/* <div className="navbar-boards">Board Bart</div> */}
      <section className="board-info-bar">
        <div className="board-controls">
          <button className="board-title btn">
            <h4>Web Development</h4>
          </button>

          <button className="star-btn btn" aria-label="Star Board">
            <i className="fa fa-star" aria-hidden="true"></i>
          </button>

          <button className="personal-btn btn">Personal</button>

          <button className="private-btn btn">
            <i
              className="fa fa-briefcase private-btn-icon"
              aria-hidden="true"
            ></i>
            Private
          </button>
        </div>

        <button className="menu-btn btn">
          <i className="fa fa-ellipsis-h menu-btn-icon" aria-hidden="true"></i>
          Show Menu
        </button>
      </section>
    </>
  );
}

export default BoardBar;
