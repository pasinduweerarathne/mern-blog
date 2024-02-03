import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const navLinks = [
  { name: "Home", type: "link", path: "/" },
  { name: "Articles", type: "link", path: "/articles" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { name: "About Us", path: "/about-us" },
      { name: "Contact Us", path: "/contact-us" },
    ],
  },
  { name: "Pricing", type: "link", path: "/pricing" },
  { name: "FAQ", type: "link", path: "/faq" },
];

const NavItems = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 md:flex-row md:justify-end">
      {navLinks.map((link, index) =>
        link.type === "link" ? (
          <Link
            to={link.path}
            className="cursor-pointer text-white relative group font-semibold duration-300 hover:text-blue-500 md:text-dark-hard"
            key={index}
          >
            {link.name}
            <span className="absolute bg-blue-500 h-[2px] bottom-0 left-0 w-0 group-hover:w-full duration-500"></span>
          </Link>
        ) : (
          <div key={index}>
            <div
              className="flex justify-center cursor-pointer text-white font-semibold md:text-dark-hard"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {link.name} <MdKeyboardArrowDown className="text-2xl" />
            </div>
            <div
              className={`${
                dropdownOpen ? "block" : "hidden"
              } flex flex-col md:absolute`}
            >
              <div className="mt-4 flex flex-col items-center bg-dark-soft rounded-lg overflow-hidden md:bg-transparent md:shadow-lg">
                {link.items.map((link, index) => (
                  <Link
                    className="cursor-pointer px-6 py-2 w-full hover:bg-dark-hard hover:text-white group"
                    key={index}
                    to={link.path}
                  >
                    <div className="relative text-center font-semibold duration-500">
                      {link.name}
                      <span className="absolute bg-white h-[3px] bottom-0 left-0 w-0 group-hover:w-full duration-500"></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )
      )}
      <button className="border-2 border-blue-500 rounded-full px-6 py-2 font-semibold text-blue-500 transition-all duration-500 hover:bg-blue-500 hover:text-white">
        Sign In
      </button>
    </div>
  );
};

const Header = () => {
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-4">
      <div>Logo</div>

      <div className="md:hidden">
        {isMobileNavOpen ? (
          <AiOutlineClose
            className="text-2xl cursor-pointer"
            onClick={() => setisMobileNavOpen(!isMobileNavOpen)}
          />
        ) : (
          <AiOutlineMenu
            className="text-2xl cursor-pointer"
            onClick={() => setisMobileNavOpen(!isMobileNavOpen)}
          />
        )}
      </div>

      <div
        className={`${
          isMobileNavOpen ? "left-0" : "left-full"
        } fixed mt-[56px] top-0 bottom-0 w-full bg-dark-hard transition-all duration-300 md:mt-0 md:static md:bg-transparent`}
      >
        <NavItems />
      </div>
    </header>
  );
};

export default Header;
