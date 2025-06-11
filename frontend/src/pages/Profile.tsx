import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loginAPI, registerAPI } from "../services/api";

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
        <div>
          <h2>Привет {email}!</h2>
          <p>Готов узнать свой экологический след?</p>
          <button onClick={logout}>Выйти</button>
        </div>
      ) : status === "login" ? (
        <div>
          <h2>Вход в аккаунт</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          <button onClick={handleSubmit}>Войти</button>
          <p>
            Нет аккаунта?
            <button onClick={() => setStatus("register")}>
              Зарегистрироваться
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2>Регистрация</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          <button onClick={handleSubmit}>Зарегистрироваться</button>
          <p>
            Уже есть аккаунт?
            <button onClick={() => setStatus("login")}>Войти</button>
          </p>
        </div>
      )}
    </>
  );
}
