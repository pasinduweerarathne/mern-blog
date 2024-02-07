import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/user";

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

const Header = () => {
  const dispatch = useDispatch()
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { userInfo } = useSelector(state => state.user)

  return (
    <header className="sticky top-0 flex justify-between items-center py-4 px-4 z-10 bg-white shadow-md">
      <div>Logo</div>

      <div className="md:hidden z-10">
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

      <div className={`${isMobileNavOpen ? "left-0" : "left-full"} flex flex-col gap-10 fixed top-0 bottom-0 right-0 w-full justify-center items-center bg-dark-hard transition-all duration-500 mt-[56px] md:flex-row md:static md:mt-0 md:bg-transparent md:justify-end`}>
        {navLinks.map((link, index) => (
          <div key={index}>
            {
              link.type === "link" ?
                <Link to={link.path} className="relative group text-white font-semibold md:text-dark-hard"> {link.name}
                  <span className="bg-blue-500 absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full"></span>
                </Link>
                :
                <div className={"md:relative group"}>
                  <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer text-white font-semibold flex items-center md:text-dark-hard justify-center">
                    {link.name}
                    <MdKeyboardArrowDown className="text-2xl" />
                  </div>
                  <div className={`${isDropdownOpen ? "block" : "hidden"} md:absolute md:-left-7 md:hidden md:group-hover:block`}>
                    <div className="flex flex-col rounded-lg overflow-hidden border mt-2 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-dark-hard w-[110px] md:border-none">
                      {link.items.map((link, index) => (
                        <Link key={index} className="font-semibold px-2 py-2 text-white text-center transition-all duration-300 hover:bg-white hover:text-dark-hard">
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
            }
          </div>
        ))}
        {userInfo ?
          <div className={"md:relative group"}>
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="cursor-pointer text-white font-semibold flex items-center md:text-dark-hard justify-center">
              Profile
              <MdKeyboardArrowDown className="text-2xl" />
            </div>
            <div className={`${isProfileOpen ? "block" : "hidden"} md:absolute md:-left-7 md:hidden md:group-hover:block`}>
              <div className="flex flex-col rounded-lg overflow-hidden border mt-2 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-dark-hard w-[110px] md:border-none">
                <button
                  className="font-semibold px-2 py-2 text-white text-center transition-all duration-300 hover:bg-white hover:text-dark-hard"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          :
          <Link to={"/login"} className="border-2 border-blue-500 px-6 py-2 rounded-full transition-all duration-500 font-semibold text-white hover:text-white hover:bg-blue-500 md:text-dark-hard">Sing In</Link>
        }
      </div>
    </header >
  );
};

export default Header;
