import { useAuth } from "../context/AuthContext";
import { ShoppingCartIcon, User } from "lucide-react";


const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
        <header className="site-header">
            <div className="header-container">
                <a className="logo" href="/">
                    <img src="https://imagepng.org/crf-do-flamengo/crf-flamengo-2-2/" alt="mengo" />
                    <span className="subtle">Flamengo Store</span>
                </a>

                <nav className="nav" aria-label="Main navigation">
                    <a className="nav-link" href="#">Camisas</a>
                    <a className="nav-link" href="#">Acessórios</a>
                </nav>

                <div className="actions">
                    <button className="btn btn--ghost" aria-label="Abrir carrinho">
                        <ShoppingCartIcon />
                    </button>
                </div>

                <div>
                  {user ? (
                    <>
                      <span >
                        Olá, {user.displayName || user.email}
                      </span>
                      <button onClick={logout}>Sair</button>
                    </>
                  ) : (
                    <>
                      <button onClick={loginWithGoogle} className="btn btn--ghost">
                        <div className="actions">                           
                            <User />
                        </div>
                      </button>
                    </>
                  )}
                </div>
            </div>
        

      
      </header>
  );
};

export default Header;
