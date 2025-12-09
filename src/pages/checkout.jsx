import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../Components/header";
import { Button } from "react-bootstrap";

function Checkout() {
  const { cart, total } =
    useContext(CartContext);

  return (
    <div>
      <Header />

      {cart.length === 0 && (
        <p className="cart-empty">Seu carrinho está vazio.</p>
      )}

      {cart.length > 0 && (
        <div className="cart-content">

          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">

                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="cart-item-image"
                />

                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.nome}</h3>
                  <p className="cart-item-price">R$ {item.preco.toFixed(2)}</p>
                  <p className="cart-item-qtd">Quantidade: {item.quantidade}</p>
                </div>

              </div>
            ))}
            

            <span>Cupom de desconto</span>
            <input type="text" name="cupom" id="cupom" />
          </div>

            <p>Total: R$ {total.toFixed(2)}</p>

                        <Button variant="danger" href="/pagamento">
              Prosseguir para o pagamento
            </Button>
            
            


        </div>
      )}
      

    </div>
  );
}

export default Checkout;
