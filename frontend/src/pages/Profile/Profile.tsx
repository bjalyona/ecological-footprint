import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { loginAPI, registerAPI } from "../../services/api";
import Button from "../../components/Button/Button";
import './Profile.css'

export default function Profile() {
  const { token, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"login" | "register">("login");

  const handleSubmit = async () => {
    try {
      if (status === "login") {
        const res = await loginAPI(email, password);
        login(res.data.token);
      } else {
        await registerAPI(email, password);
        const res = await loginAPI(email, password);
        login(res.data.token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {token ? (
        <div className="container">
          <h2 className="profile-header">Привет {email}!</h2>
          <p className="profile-descr">Готов(a) узнать свой экологический след?</p>
          <Button className="logout-btn" onClick={logout}>Выйти</Button>
        </div>
      ) : status === "login" ? (
        <div className="profile-container">
          <div className="container">
            <h2 className="profile-header">Вход в аккаунт</h2>
          <div className="profile-form">
            <input
            className="profile-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
          className="profile-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          </div>
          
          <p className="profile-question">
            Нет аккаунта?
            <a className='profile-link' onClick={() => setStatus("register")}>
               Зарегистрироваться
            </a>
          </p>
          <Button className='login-btn' onClick={handleSubmit}>Войти</Button>
          </div>
        </div>
      ) : (
        <div className="profile-container">
          <div className="container">
          <h2 className="profile-header">Регистрация</h2>
          <div className="profile-form">
            <input
          className="profile-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
          className="profile-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          </div>
          
          <p className="profile-question">
            Уже есть аккаунт?
            <a className='profile-link' onClick={() => setStatus("login")}> Войти </a>
          </p>
          <Button className='login-btn' onClick={handleSubmit}>Зарегистрироваться</Button>
        </div>
        </div>
      )}
    </>
  );
}
