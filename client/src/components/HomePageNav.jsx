import logo from "/images/logo.png";

export default function HomePageNav() {
  return (
    <nav className="navbar-home">
      <div className="left-info">
        <div className="logo--home">
          <img src={logo} alt="resto-logo" width={100} height={100} />
        </div>

        <ul className="links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Services</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Contacts</a>
          </li>
        </ul>
      </div>
      <div className="right-info">
        <ul className="links">
          <li>
            <a href="/login"><i className="fa fa-sign-in-alt"></i> SignIn/SignUp</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
