import React, { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import "./Clinics.css";

const Clinics = () => {
    const [clinics, setClinics] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingClinicId, setEditingClinicId] = useState(null);
    const [newClinic, setNewClinic] = useState({
        name: "",
        address: "",
        phone: "",
        phone2: "",
        workingHoursFrom: "",
        workingHoursTo: ""
    });

    useEffect(() => {
        const savedClinics = JSON.parse(localStorage.getItem("clinics")) || [];
        setClinics(savedClinics);
    }, []);

    const openModal = () => {
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (clinic) => {
        setNewClinic(clinic);
        setEditingClinicId(clinic.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingClinicId(null);
        setNewClinic({
            name: "",
            address: "",
            phone: "",
            phone2: "",
            workingHoursFrom: "",
            workingHoursTo: ""
        });
    };

    const handleChange = (e) => {
        setNewClinic({ ...newClinic, [e.target.name]: e.target.value });
    };

    const addClinic = () => {
        if (!newClinic.name || !newClinic.address || !newClinic.phone || !newClinic.workingHoursFrom || !newClinic.workingHoursTo) return;
        const updatedClinics = [...clinics, { id: Date.now(), ...newClinic }];
        setClinics(updatedClinics);
        localStorage.setItem("clinics", JSON.stringify(updatedClinics));
        closeModal();
    };

    const editClinic = () => {
        const updatedClinics = clinics.map((clinic) =>
            clinic.id === editingClinicId ? { ...clinic, ...newClinic } : clinic
        );
        setClinics(updatedClinics);
        localStorage.setItem("clinics", JSON.stringify(updatedClinics));
        closeModal();
    };

    return (
        <div className="clinics-container">
            <div className="clinics-header">
                <h2>Клиники</h2>
                <button className="add-btn" onClick={openModal}>Добавить</button>
            </div>
            <div className="clinics-list">
                {clinics.map((clinic) => (
                    <div key={clinic.id} className="clinic-card">
                        <div className="clinic-info">
                            <div className="clinic-avatar">
                                <img src="/src/assets/location-add.svg" alt=""/>
                            </div>
                            <div className="clinic-details">
                                <h3>{clinic.name}</h3>
                                <p className="clinic-address">{clinic.address}</p>
                            </div>
                        </div>
                        <div className="clinic-contact">
                            <div className="clinic-phone"><FaPhone /> {clinic.phone}</div>
                            {clinic.phone2 && <div className="clinic-phone"><FaPhone /> {clinic.phone2}</div>}
                        </div>
                        <div className="clinic-hours">
                            {clinic.workingHoursFrom} - {clinic.workingHoursTo}
                        </div>
                        <button className="edit-btn" onClick={() => openEditModal(clinic)}>Редактировать</button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{isEditing ? "Редактирование клиники" : "Добавление клиники"}</h3>
                        <input className="input-modal" type="text" name="name" placeholder="Имя клиники" value={newClinic.name} onChange={handleChange} />
                        <input className="input-modal" type="text" name="address" placeholder="Адрес клиники" value={newClinic.address} onChange={handleChange} />
                        <input className="input-modal" type="text" name="phone" placeholder="Тел. номер" value={newClinic.phone} onChange={handleChange} />
                        <input className="input-modal" type="text" name="phone2" placeholder="Доп. тел. номер (необязательно)" value={newClinic.phone2} onChange={handleChange} />
                        <label>График работы:</label>
                        <div className="time-inputs">
                            <input className="input-modal" type="time" name="workingHoursFrom" value={newClinic.workingHoursFrom} onChange={handleChange} />
                            <span> - </span>
                            <input className="input-modal" type="time" name="workingHoursTo" value={newClinic.workingHoursTo} onChange={handleChange} />
                        </div>
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={closeModal}>Отменить</button>
                            <button className="next-button" onClick={isEditing ? editClinic : addClinic}>
                                {isEditing ? "Сохранить" : "Добавить"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clinics;
