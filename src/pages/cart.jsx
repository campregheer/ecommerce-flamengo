import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../Components/header";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } =
    useContext(CartContext);

    const navigate = useNavigate();

    function handleCheckout () {
      navigate('/checkout');
    }

  return (
    <div>
      <Header/>
      
      <div className="cart-page">
        <h1>Carrinho</h1>

        {cart.length === 0 && <p className="cart-empty">Seu carrinho está vazio.</p>}

        {cart.length > 0 && (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imagem} alt={item.nome} className="cart-item-image" />
                  
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.nome}</h3>
                    <p className="cart-item-price">R$ {item.preco.toFixed(2)}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                      >
                        −
                      </button>
                      <span className="quantity-display">{item.quantidade}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-sidebar">
              <div className="cart-summary">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">R$ {total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Total</span>
                  <span className="summary-value">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <button className="checkout-btn" onClick={() => {handleCheckout()}}>Finalizar Compra</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
