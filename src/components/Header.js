// Images
import headerLogo from "src/assets/images/logos/logo.png";
const Header = () => {
  return (
    <header>
      <nav className="flex">
        <img className="w-[100px]" src={headerLogo} alt="" />
      </nav>
    </header>
  );
};

export default Header;
