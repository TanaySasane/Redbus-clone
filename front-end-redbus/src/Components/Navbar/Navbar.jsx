import React from "react";
import styles from "./Navbar.module.css";
import { MdAccountCircle } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/auth/actions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((s) => s.authReducer.isLoggedIn);
  const isAdmin = useSelector((s) => s.authReducer.isAdmin);
  const currentCustomer = useSelector((s) => s.authReducer.currentCustomer);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    history.push("/");
  };

  return (
    <div className={styles.Navbar}>
      <div className={styles.leftSide_header}>
        <img
          src="/logo.png"
          alt="logo"
          className={styles.logoImg}
          onClick={() => history.push("/")}
        />
        <ul className={styles.Navbar__listOne}>
          <li><Link to="/">BUS TICKETS</Link></li>
          <li><Link to="/cities">CITIES</Link></li>
          <li><Link to="/bus-hire">BUS HIRE</Link></li>
          <li>
            rPool<span className={styles.newBadge}>New</span>
          </li>
        </ul>
      </div>

      <div className={styles.rightSide_header}>
        {isAdmin && (
          <Link to="/admin" className={styles.adminLink}>
            👑 Admin Panel
          </Link>
        )}

        {isLoggedIn && currentCustomer ? (
          <div className={styles.userMenu}>
            <div
              className={styles.userInfo}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {currentCustomer.profilePicture ? (
                <img
                  src={currentCustomer.profilePicture}
                  alt="avatar"
                  className={styles.avatar}
                />
              ) : (
                <MdAccountCircle className={styles.avatarIcon} />
              )}
              <span className={styles.userName}>
                {currentCustomer.name?.split(" ")[0]}
              </span>
              <RiArrowDropDownLine className={styles.dropIcon} />
            </div>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => { history.push("/my-profile"); setAnchorEl(null); }}>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => { history.push("/my-profile"); setAnchorEl(null); }}>
                My Trips
              </MenuItem>
              {isAdmin && (
                <MenuItem onClick={() => { history.push("/admin"); setAnchorEl(null); }}>
                  Admin Panel
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout} style={{ color: "#d84f57" }}>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginBtn}>Login</Link>
            <Link to="/register" className={styles.registerBtn}>Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
