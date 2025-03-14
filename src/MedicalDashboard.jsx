import { useState, useEffect, useRef } from "react";
import "./MedicalDashboard.css";

function MedicalDashboard() {
    const [activeTab, setActiveTab] = useState("archive");
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEntryText, setNewEntryText] = useState("");
    const [editingEntryId, setEditingEntryId] = useState(null);

    const dropdownRef = useRef(null);


    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem("entries"));
        if (savedEntries && savedEntries.length > 0) {
            setEntries(savedEntries);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("entries", JSON.stringify(entries));
    }, [entries]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleSaveEntry = () => {
        if (!newEntryText.trim()) return;

        if (editingEntryId) {
            setEntries(
                entries.map((entry) =>
                    entry.id === editingEntryId ? { ...entry, text: newEntryText } : entry
                )
            );
        } else {

            const newEntry = {
                id: Date.now(),
                text: newEntryText,
                author: "New File.jpg",
                date: new Date().toLocaleString("ru-RU"),
            };
            setEntries([...entries, newEntry]);
        }


        setShowModal(false);
        setNewEntryText("");
        setEditingEntryId(null);
    };


    const handleEditEntry = (entry) => {
        setNewEntryText(entry.text);
        setEditingEntryId(entry.id);
        setShowModal(true);
        setOpenDropdownId(null);
    };


    const handleDeleteEntry = (entryId) => {
        const updatedEntries = entries.filter((entry) => entry.id !== entryId);
        setEntries(updatedEntries);
        setOpenDropdownId(null);
    };

    return (
        <div className="dashboard">
            <div className="main-content">
                <div className="header">
                    <h1 className="title">Регистры</h1>
                </div>


                <div className="tabs">
                    <TabButton label="Форум АФФа" active={activeTab === "forum"} onClick={() => setActiveTab("forum")} />
                    <TabButton label="Форум АФФа (архив)" active={activeTab === "archive"} onClick={() => setActiveTab("archive")} />
                    <TabButton label="Клинические рекомендации АФФа" active={activeTab === "clinical"} onClick={() => setActiveTab("clinical")} />
                    <TabButton label="Флебологу" active={activeTab === "phlebology"} onClick={() => setActiveTab("phlebology")} />
                </div>

                <div className="button-container bottom">
                    <button className="add-button" onClick={() => setShowModal(true)}>Добавить</button>
                </div>

                <div className="archive-section">
                    <h2 className="section-title">
                        {activeTab === "forum" && "Форум АФФа"}
                        {activeTab === "archive" && "Форум АФФа (архив)"}
                        {activeTab === "clinical" && "Клинические рекомендации АФФа"}
                        {activeTab === "phlebology" && "Флебологу"}
                    </h2>



                    <div className="entries">
                        {entries.map((entry) => (
                            <div key={entry.id} className="entry">

                                <div className="entry-icon-container">
                                    <div
                                        className="entry-icons"
                                        onClick={() => setOpenDropdownId(openDropdownId === entry.id ? null : entry.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
                                        </svg>
                                    </div>

                                    {openDropdownId === entry.id && (
                                        <div className="dropdown" ref={dropdownRef}>
                                            <div className="dropdown-content">
                                                <div className="dropdown-item" onClick={() => handleEditEntry(entry)}>
                                                    <span className="icon">✏️</span> Редактировать
                                                </div>
                                                <div className="dropdown-item delete" onClick={() => handleDeleteEntry(entry.id)}>
                                                    <span className="icon">🗑️</span> Удалить
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>


                                <div className="entry-content">
                                    <p className="entry-text">{entry.text}</p>
                                    <div className="entry-meta">
                                        <span className="entry-author">{entry.author}</span>
                                        <span className="entry-date">{entry.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{editingEntryId ? "Редактировать запись" : "Добавить запись"}</h2>
                            <input
                                type="text"
                                className="input-modal"
                                placeholder="Введите описание..."
                                value={newEntryText}
                                onChange={(e) => setNewEntryText(e.target.value)}
                            />
                            <div className="modal-buttons">
                                <button className="cancel-button" onClick={() => { setShowModal(false); setEditingEntryId(null); setNewEntryText(""); }}>
                                    Отмена
                                </button>
                                <button className="add-button" onClick={handleSaveEntry}>
                                    {editingEntryId ? "Сохранить" : "Добавить"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ label, active, onClick }) {
    return (
        <button onClick={onClick} className={`tab-button ${active ? "active" : ""}`}>
            {label}
            <div className="tab-divider"></div>
        </button>
    );
}

export default MedicalDashboard;
