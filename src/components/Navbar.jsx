import {
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

function Navbar() {
  return (
    <div
      className="navbar-custom d-flex justify-content-between align-items-center p-3 shadow-sm"
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <div>
        <h4 className="mb-0">
          Welcome Back 👋
        </h4>

        <small className="text-muted">
          {new Date().toDateString()}
        </small>
      </div>

      <div
        className="d-flex align-items-center gap-3"
      >
        <div
          className="input-group"
          style={{
            width: "250px",
          }}
        >
          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search..."
          />
        </div>

        <FaBell
          size={22}
          style={{
            cursor: "pointer",
          }}
        />

        <FaUserCircle
          size={35}
          style={{
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;