import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/imgs/logo.png";
import { Loading } from "../../components/Loading";
import { AuthContext } from "../../context/Auth";
import "./styles.css";

export const SingIn = () => {
  const navigate = useNavigate();
  const { singIn, loading } = useContext(AuthContext);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const email = ev.currentTarget.email.value;
    const password = ev.currentTarget.password.value;

    await singIn({
      email,
      password,
    })
      .then(() => {
        navigate("/dashboard/transaction");
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return !loading ? (
    <Loading />
  ) : (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <header>
          <div className="logo">
            <img src={logo} alt="Fifa Trade Brasil" />
            <h1>FIFA TRADE BRASIL</h1>
          </div>
          <div className="description">
            <h2>Login</h2>
            <h4>Precisamos de suas credenciais para continuar</h4>
          </div>
        </header>
        <div className="form-group">
          <small>E-mail:</small>
          <input
            type="email"
            name="email"
            placeholder="fifatradebr@gmail.com"
          />
        </div>
        <div className="form-group">
          <small>Senha:</small>
          <input type="password" name="password" placeholder="********" />
        </div>
        <div className="sing-up">
          <a href="">Não tem conta? Registre-se.</a>
        </div>
        <button>Entrar</button>
      </form>
    </div>
  );
};
