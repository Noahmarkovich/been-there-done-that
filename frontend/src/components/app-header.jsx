export function AppHeader() {
  return (
    <header className="app-header">
      <img
        className="logo"
        src={require("../assets/img/newLogo.png")}
        alt="logo"
      />
      <nav>
        <a href="/">HOME</a>
        <a href="/">ABOUT</a>
        <a href="/">DESTINATIONS</a>
      </nav>
    </header>
  );
}
