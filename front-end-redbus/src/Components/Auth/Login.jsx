import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { localLogin } from "../../Redux/auth/actions";
import styles from "./Auth.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((s) => s.authReducer.isLoggedIn);

  if (isLoggedIn) {
    history.replace("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const result = dispatch(localLogin(email, password));
    setLoading(false);
    if (result && result.success) {
      history.push(result.isAdmin ? "/admin" : "/");
    } else {
      setError("Invalid credentials. Try admin@redbus.com / admin123");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src="/logo.png" alt="redBus" className={styles.logo} />
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Sign in to your redBus account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorBox}>{error}</div>}

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <div className={styles.hint}>
          <p>Demo credentials:</p>
          <p><strong>Admin:</strong> admin@redbus.com / admin123</p>
          <p><strong>User:</strong> any email + 6+ char password</p>
        </div>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
