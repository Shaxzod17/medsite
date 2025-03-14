import React, { useState } from "react";
import UserList from "./UserList.jsx";
import MedicalDashboard from "./MedicalDashboard.jsx";
import "./App.css";
import Clinics from "./Clinics.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    function SidebarItem({ iconSrc, label, active, onClick }) {
        return (
            <div
                className={`sidebar-item ${active ? "active" : ""}`}
                onClick={onClick}
            >
                {iconSrc && <img src={iconSrc} alt={label} className="icon-img" />}
                <span className="sidebar-label">{label}</span>
            </div>
        );
    }


    const renderComponent = () => {
        switch (selectedComponent) {
            case "Пользователи":
                return <UserList />;
            case "Регистры":
                return <MedicalDashboard />;
            case "Клиники":
                return <Clinics />;
            default:
                return <UserList />;
        }
    };


    const handleLogoutClick = () => {
        toast.info('Вы ещё не зарегистривовались!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
                background: "#ffffff",
                color: "#002244",
                fontSize: "18px",
                borderRadius: "10px",
                padding: "15px",
            },
        });

    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="logo-container">
                    <img
                        src="/assets/logo.svg"
                        alt="Logo"
                        className="logo"
                    />
                </div>
                <div className="sidebar-items">
                    <div className="icon-text">
                        <SidebarItem iconSrc="/assets/user-tag.svg" label="Пользователи" active={selectedComponent === "Пользователи"} onClick={() => setSelectedComponent("Пользователи")} />
                    </div>
                    <div>
                        <SidebarItem iconSrc="/assets/element-equal.svg" label="Регистры" active={selectedComponent === "Регистры"} onClick={() => setSelectedComponent("Регистры")} />
                    </div>
                    <div>
                        <SidebarItem iconSrc="/assets/hospital.svg" label="Клиники" active={selectedComponent === "Клиники"} onClick={() => setSelectedComponent("Клиники")} />
                    </div>
                </div>

                <div className="sidebar-footer">
                    <SidebarItem
                        iconSrc="/assets/logout.svg"
                        label="Выход из системы"
                        active={false}
                        onClick={handleLogoutClick}
                    />
                </div>
            </div>
            <div className="main-content">
                {renderComponent()}
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
