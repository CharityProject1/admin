import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const navigate = useNavigate();

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate("/auth/sign-in"); // Redirect to sign-in page
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 flex flex-col justify-between`}
    >
      {/* Sidebar Content */}
      <div>
        <div className="relative">
          <Link to="/" className="py-6 px-8 text-center">
            <Typography
              variant="h6"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              {brandName}
            </Typography>
          </Link>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>

        {/* Sidebar Links */}
        <div className="m-4">
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages
                .filter(({ path }) => path !== "/sign-in") // Exclude Sign-In route
                .map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`/${layout}${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color={
                            isActive
                              ? sidenavColor
                              : sidenavType === "dark"
                                ? "white"
                                : "blue-gray"
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="m-4">
        <Button
          variant="gradient"
          color="red"
          className="flex items-center gap-4 px-4 capitalize w-full"
          onClick={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <Typography color="inherit" className="font-medium capitalize">
            تسجيل خروج
          </Typography>
        </Button>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
