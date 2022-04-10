import React from "react";
import "./style.scss";

function AppBar() {
  return (
    <>
      {/* <div className="navbar-app">Trello rep1:1</div> */}
      <header className="masthead">
        <div className="boards-menu">
          <button className="boards-btn btn">
            <i className="fa fa-trello boards-btn-icon"></i>Boards
          </button>

          <div className="board-search">
            <input
              type="search"
              className="board-search-input"
              aria-label="Board Search"
            />
            <i className="fa fa-search search-icon" aria-hidden="true"></i>
          </div>
        </div>

        <div className="logo">
          <h3>
            <i className="fa fa-trello logo-icon" aria-hidden="true"></i>Trello
          </h3>
        </div>

        <div className="user-settings">
          <button className="user-settings-btn btn" aria-label="Create">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>

          <button className="user-settings-btn btn" aria-label="Information">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </button>

          <button className="user-settings-btn btn" aria-label="Notifications">
            <i className="fa fa-bell" aria-hidden="true"></i>
          </button>

          <button className="user-settings-btn btn" aria-label="User Settings">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </button>
        </div>
      </header>
    </>
  );
}

export default AppBar;
