import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import ProfileEditPage from "../ProfileEditPage";

const TopBar = ({ user }) => {
  const unauthenticatedButtons = [
    <ul className="list-none flex items-center mt-3">
      <li
        key="sign-in"
        className="mb-3"
        // className="py-2 px-2.5 bg-gray-800 text-white mr-4 rounded shadow"
      >
        <Link
          className="py-2 px-2 bg-gray-800 text-white rounded shadow mr-2 hover:bg-color-black no-underline"
          to="/user-sessions/new"
        >
          Sign In
        </Link>
      </li>
      <li
        key="sign-up"
        className="mb-3"
        // className="py-2 px-2.5 bg-gray-800 text-white rounded shadow"
      >
        <Link
          to="/users/new"
          className="py-2 px-2 bg-gray-800 text-white rounded shadow ml-2 hover:bg-color-black no-underline"
        >
          Sign Up
        </Link>
      </li>
    </ul>
  ];

  const authenticatedButtons = [
      <SignOutButton />
  ];

  return (
    <nav className="bg-gray-900 shadow">
      <div className="px-8 mx-auto">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <a
                href="/"
                className="flex items-center py-4 px-4 text-white font-bold no-underline"
              >
                <span>Sweeper Scout</span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-1 mr-2">
            {user === null ? unauthenticatedButtons : authenticatedButtons}
          </div>
        </div>
      </div>
    </nav>

    // <div className="top-bar">
    //   <div className="top-bar-left">
    //     <ul className="menu">
    //       <li className="menu-text">App</li>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/edit">Edit Profile</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="top-bar-right">
    //     <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
    //   </div>
    // </div>
  );
};

export default TopBar;
