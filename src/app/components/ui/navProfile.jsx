import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LogOut from "../../layouts/logOut";

const NavProfile = () => {
    const [isOpen, setOpen] = useState(false);
    const { currentUser } = useAuth();

    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <div className="dropdown" onClick={toggleMenu}>
                <div className="btn dropdown-toggle d-flex align-items-center">
                    <div className="mb-2">{currentUser.name}</div>
                    <img
                        alt=""
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        height="40"
                        className="img-resposive rounded-circle"
                    />
                </div>
                <div
                    className={
                        "w-100 dropdown-menu" + (isOpen ? " show" : "")
                    }
                >
                    <LogOut />
                </div>
            </div>
        </>
    );
};

export default NavProfile;
