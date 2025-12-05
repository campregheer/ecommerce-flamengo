import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCartIcon, User } from "lucide-react";
import Button from 'react-bootstrap/Button';


const Header = ({setFiltroTipo, filtroTipo}) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  function abrirCarrinho() {
    navigate("/carrinho");
  };


  return (
        <header className="site-header">
            <div className="header-container">
                <a className="logo" href="/">
                    <img src="https://imagepng.org/crf-do-flamengo/crf-flamengo-2-2/" alt="mengo" />
                    <span className="subtle">Flamengo Store</span>
                </a>
                {isHome && (
                  <nav className="nav" aria-label="Main navigation">
                    <a className="nav-link" onClick={() => {setFiltroTipo(null)}} style={{ fontWeight: filtroTipo === null ? "700" : "400", color:"#e03b3b"}}>Todas</a>
                    <a className="nav-link" onClick={() => {setFiltroTipo(1)}} style={{ fontWeight: filtroTipo === 1 ? "700" : "400", color:"#e03b3b" }}>Camisas</a>
                    <a className="nav-link" onClick={() => {setFiltroTipo(2)} } style={{ fontWeight: filtroTipo === 2 ? "700" : "400", color:"#e03b3b" }}>Acessórios</a>
                  </nav>

                )}

                <div className="user-section">
                  <button className="btn btn--ghost" aria-label="Abrir carrinho" onClick={() => {abrirCarrinho()}}>
                    <ShoppingCartIcon />
                  </button>

                  {user ? (
                    <>
                      <img className="user-photo" src={user.photoURL} alt="Foto do usuário" />
                      <Button onClick={logout} variant="outline-danger" className="logout-btn">Sair</Button>
                    </>
                  ) : (
                    <button onClick={loginWithGoogle} className="btn btn--ghost" aria-label="Login com Google">
                      <User />
                    </button>
                  )}
                </div>
            </div>
        

      
      </header>
  );
};

export default Header;
