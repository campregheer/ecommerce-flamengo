import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/header";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

import {
  doc,
  getDoc,
  runTransaction,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function Payment() {
  const { cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethods, setPaymentMethods] = useState(null);

  const [form, setForm] = useState({
    cep: "",
    address: "",
    number: "",
    neighborhood: "",
    recipient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function validateForm() {
    if (!paymentMethods) {
      toast.error("Escolha um método de pagamento.");
      return false;
    }
    const required = ["cep", "address", "number", "neighborhood", "recipient"];
    for (const key of required) {
      if (!form[key] || form[key].toString().trim() === "") {
        toast.error("Preencha todos os campos de entrega.");
        return false;
      }
    }
    if (!cart || cart.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return false;
    }
    return true;
  }

  // Função principal: finalizar compra (simulada)
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await runTransaction(db, async (transaction) => {

        for (const item of cart) {
          const prodRef = doc(db, "produtos", item.id);
          const prodSnap = await transaction.get(prodRef);

          if (!prodSnap.exists()) {
            throw new Error(`Produto ${item.nome} não encontrado no banco.`);
          }

          const data = prodSnap.data();

          const estoqueAtual = Number(data.quantidade_estoque ?? 0);
          const qtdDesejada = Number(item.quantidade);

          if (qtdDesejada > estoqueAtual) {
            throw new Error(
              `Estoque insuficiente para "${item.nome}". Disponível: ${estoqueAtual}.`
            );
          }

          const novoEstoque = estoqueAtual - qtdDesejada;

          transaction.update(prodRef, { quantidade_estoque: novoEstoque });
        }
      });

      // 2) Criar documento de pedido (coleção "pedidos")
      const pedidosRef = collection(db, "pedidos");
      await addDoc(pedidosRef, {
        items: cart.map((i) => ({
          id: i.id,
          nome: i.nome,
          preco: i.preco,
          quantidade: i.quantidade,
        })),
        total,
        paymentMethod: paymentMethods,
        shipping: { ...form },
        status: "Pago (simulado)",
        createdAt: serverTimestamp(),
      });

      // 3) Esvaziar carrinho local
      clearCart();

      // 4) Feedback + redirecionamento
      toast.success("Pagamento aprovado (simulado). Pedido realizado!");
      navigate("/sucesso"); // crie a rota /sucesso com a página de confirmação
    } catch (err) {
      // se a transaction lançou erro (ex: estoque insuficiente) trata aqui
      console.error(err);
      toast.error(err.message || "Erro ao processar o pedido.");
    }
  }

  return (
    <div>
      <Header />

      {cart.length === 0 && (
        <div className="payment-page">
          <p className="cart-empty">Seu carrinho está vazio.</p>
        </div>
      )}

      {cart.length > 0 && (
        <div className="payment-page">
          <h1>Finalizar Pagamento</h1>

          <div className="payment-content">
            <div>
              <div className="payment-items">
                {cart.map((item) => (
                  <div key={item.id} className="payment-item">
                    <img src={item.imagem} alt={item.nome} className="payment-item-image" />

                    <div className="payment-item-info">
                      <h3 className="payment-item-name">{item.nome}</h3>
                      <p className="payment-item-price">R$ {item.preco.toFixed(2)}</p>
                      <p className="payment-item-qtd">Quantidade: {item.quantidade}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="payment-form">
                <h2>Método de Pagamento</h2>
                <div className="payment-methods">
                  <button
                    type="button"
                    className={`payment-method-btn ${paymentMethods === "PIX" ? "active" : ""}`}
                    onClick={() => setPaymentMethods("PIX")}
                  >
                    PIX
                  </button>
                  <button
                    type="button"
                    className={`payment-method-btn ${paymentMethods === "CRÉDITO" ? "active" : ""}`}
                    onClick={() => setPaymentMethods("CRÉDITO")}
                  >
                    CRÉDITO
                  </button>
                  <button
                    type="button"
                    className={`payment-method-btn ${paymentMethods === "DÉBITO" ? "active" : ""}`}
                    onClick={() => setPaymentMethods("DÉBITO")}
                  >
                    DÉBITO
                  </button>
                </div>

                <h2>Informações de Entrega</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cep">CEP</label>
                    <input
                      id="cep"
                      type="text"
                      name="cep"
                      className="form-input"
                      placeholder="00000-000"
                      value={form.cep}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="address">Endereço</label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      className="form-input"
                      placeholder="Rua exemplo"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="number">Número</label>
                    <input
                      id="number"
                      type="text"
                      name="number"
                      className="form-input"
                      placeholder="123"
                      value={form.number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="neighborhood">Bairro</label>
                    <input
                      id="neighborhood"
                      type="text"
                      name="neighborhood"
                      className="form-input"
                      placeholder="Bairro"
                      value={form.neighborhood}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="recipient">Destinatário</label>
                    <input
                      id="recipient"
                      type="text"
                      name="recipient"
                      className="form-input"
                      placeholder="Seu nome completo"
                      value={form.recipient}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="payment-submit-btn">
                    Finalizar Pagamento
                  </button>
                </form>
              </div>
            </div>

            <div className="payment-sidebar">
              <div className="payment-summary">
                <h2>Resumo</h2>
                <div className="summary-row">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value">R$ {total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Método:</span>
                  <span className="summary-value">{paymentMethods ?? "Não selecionado"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
