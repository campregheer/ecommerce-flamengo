import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../Components/header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, total } =
    useContext(CartContext);
    const navigate = useNavigate();

    function handlePayment () {
      navigate('/pagamento');
    }

  return (
    <div>
      <Header />

      {cart.length === 0 && (
        <div className="checkout-page">
          <p className="cart-empty">Seu carrinho está vazio.</p>
        </div>
      )}

      {cart.length > 0 && (
        <div className="checkout-page">
          <h1>Resumo da Compra</h1>

          <div className="checkout-content">
            <div>
              <div className="checkout-items">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="checkout-item-image"
                    />

                    <div className="checkout-item-info">
                      <h3 className="checkout-item-name">{item.nome}</h3>
                      <p className="checkout-item-price">R$ {item.preco.toFixed(2)}</p>
                      <p className="checkout-item-qtd">Quantidade: {item.quantidade}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-form">
                <h2>Cupom de Desconto</h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="cupom">Código do Cupom</label>
                  <input
                    type="text"
                    name="cupom"
                    id="cupom"
                    className="form-input"
                    placeholder="Digite seu código de cupom"
                  />
                </div>
              </div>
            </div>

            <div className="checkout-sidebar">
              <div className="checkout-summary">
                <h2>Resumo</h2>
                <div className="summary-row">
                  <span className="summary-label">Subtotal:</span>
                  <span className="summary-value">R$ {total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Desconto:</span>
                  <span className="summary-value">R$ 0,00</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value">R$ {total.toFixed(2)}</span>
                </div>

                <button
                  className="checkout-proceed-btn"
                  onClick={() => {
                    handlePayment();
                  }}
                >
                  Prosseguir para Pagamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
