import Header from "../Components/header";
import { useAuth } from "../context/AuthContext";


function User() {
    const { user, loginWithGoogle, logout } = useAuth();
    

  return (
    <div>
      <Header />
      {!user && (
        <div className="user-page">
          <div className="auth-container">
            <div className="auth-card">
              <h1>Acesse Sua Conta</h1>
              <p className="auth-subtitle">Faça login para acessar sua conta e histórico de pedidos</p>
              <button onClick={loginWithGoogle} className="login-btn">
                Login com Google
              </button>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className="user-page">
          <div className="user-profile">
            <div className="profile-header">
              <img className="profile-photo" src={user.photoURL} alt="Foto do usuário" />
              <h1 className="profile-name">{user.displayName}</h1>
              <p className="profile-email">{user.email}</p>
            </div>

            <div className="profile-actions">
              <button onClick={logout} className="logout-btn">
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;