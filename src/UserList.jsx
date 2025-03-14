import { useState, useEffect } from 'react';
import './UserList.css';
import { SearchIcon, EyeIcon } from './icons.jsx';

function UserList() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        gender: '',
        country: '',
        city: '',
        phone: '',
        jobSpecialty: '',
        email: '',
        workplace: '',
        position: '',
        workAddress: '',
        workExperience: '',
        specialty: '',
        registrationDate: new Date().toLocaleDateString('ru-RU')
    });

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const openUserModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeUserModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const openFormModal = () => {
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        if (formData.lastName && formData.firstName && formData.email) {
            const updatedUsers = [...users, formData];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            setFormData({
                lastName: '', firstName: '', middleName: '', birthDate: '', gender: '', country: '', city: '', phone: '',
                jobSpecialty: '', email: '', workplace: '', position: '', workAddress: '', workExperience: '', specialty: '',
                registrationDate: new Date().toLocaleDateString('ru-RU')
            });

            closeFormModal();
        } else {
            alert("Заполните обязательные поля");
        }
    };

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app">
            <main className="main">
                <header className="header">
                    <div className="header-left">
                        <h1>Пользователи: Активный</h1>
                    </div>
                    <div className="header-right">
                        <button className="add-button" onClick={openFormModal}>Добавить</button>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Поиск пользователей"
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <SearchIcon className="search-icon" />
                        </div>
                        <button className="admin-button">
                            <span className="admin-icon">👤</span>
                            Админ
                        </button>
                    </div>
                </header>

                <div className="users-list">
                    {filteredUsers.map((user, index) => (
                        <div key={index} className="user-card">
                            <div className="user-avatar">
                                <img src="/src/assets/Rectangle 32.svg" alt={user.firstName} />
                            </div>
                            <div className="user-info">
                                <div className="user-primary">
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <span className="user-date">{user.registrationDate}</span>
                                </div>
                                <span className="user-workplace">{user.workplace}</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                            <button className="view-button" onClick={() => openUserModal(user)}>
                                <EyeIcon className="eye-icon" />
                                Смотреть
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {isFormModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Добавить пользователя</h2>
                        <input className="input-modal" type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} />
                        <input className="input-modal" type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} />
                        <input className="input-modal" type="text" name="middleName" placeholder="Отчество" value={formData.middleName} onChange={handleChange} />
                        <input className="input-modal" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                        <input className="input-modal" type="text" name="gender" placeholder="Пол" value={formData.gender} onChange={handleChange} />
                        <input className="input-modal" type="text" name="country" placeholder="Страна" value={formData.country} onChange={handleChange} />
                        <input className="input-modal" type="text" name="city" placeholder="Город" value={formData.city} onChange={handleChange} />
                        <input className="input-modal" type="text" name="phone" placeholder="Мобильный телефон" value={formData.phone} onChange={handleChange} />
                        <input className="input-modal" type="text" name="jobSpecialty" placeholder="Рабочая специальность" value={formData.jobSpecialty} onChange={handleChange} />
                        <input className="input-modal" type="email" name="email" placeholder="Почта" value={formData.email} onChange={handleChange} />
                        <input className="input-modal" type="text" name="workplace" placeholder="Место работы" value={formData.workplace} onChange={handleChange} />
                        <input className="input-modal" type="text" name="position" placeholder="Должность" value={formData.position} onChange={handleChange} />
                        <input className="input-modal" type="text" name="workAddress" placeholder="Адрес" value={formData.workAddress} onChange={handleChange} />
                        <textarea className="input-modal" name="workExperience" placeholder="Опыт работы" value={formData.workExperience} onChange={handleChange} />
                        <button className="cancel-button" onClick={closeFormModal}>Отменить</button>
                        <button className="next-button" onClick={handleAddUser}>Сохранить</button>
                    </div>
                </div>
            )}

            {isModalOpen && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>ОСНОВНАЯ ИНФОРМАЦИЯ</h2>
                        <div className={"main-div"}>
                            <img src="/src/assets/Rectangle 32.svg" alt="User Avatar" className="user-avatar2" />
                            <p><strong>Фамилия:</strong> {selectedUser.lastName}</p>
                            <p><strong>Имя:</strong> {selectedUser.firstName}</p>
                            <p><strong>Отчество:</strong> {selectedUser.middleName}</p>
                        </div>
                        <p><strong>Дата рождения:</strong> {selectedUser.birthDate}</p>
                        <p><strong>Пол:</strong> {selectedUser.gender}</p>
                        <p><strong>Страна:</strong> {selectedUser.country}</p>
                        <p><strong>Город:</strong> {selectedUser.city}</p>
                        <p><strong>Адрес:</strong> {selectedUser.workAddress}</p>
                        <p><strong>Телефон:</strong> {selectedUser.phone}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Место работы:</strong> {selectedUser.workplace}</p>
                        <p><strong>Рабочая специальность:</strong> {selectedUser.jobSpecialty}</p>
                        <button className="cancel-button" onClick={closeUserModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;
