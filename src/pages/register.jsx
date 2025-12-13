import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Header from "../Components/header";

function Cadastro() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('');

  async function cadastrar() {
    try {
      const produtoData = {
        nome,
        preco: Number(preco),
        imagem,
        quantidade_estoque: Number(quantidade),
        tipo: Number(tipo)
      };

      const docRef = await addDoc(collection(db, "produtos"), produtoData);
      console.log("Produto cadastrado com sucesso! ID:", docRef.id);

      setNome('');
      setPreco('');
      setImagem('');
      setQuantidade('');
      setTipo('');
    } catch (error) {
      console.error("Erro ao cadastrar produto: ", error);
    }
  }

  return (
    <div>
      <Header />
      <div className="register-page">
        <div className="register-container">
          <h1>Cadastro de Produto</h1>

          <form className="register-form" onSubmit={(e) => { e.preventDefault(); cadastrar(); }}>
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Nome do Produto</label>
              <input
                id="nome"
                type="text"
                className="form-input"
                placeholder="Digite o nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quantidade">Quantidade em Estoque</label>
              <input
                id="quantidade"
                type="number"
                className="form-input"
                placeholder="0"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="preco">Preço do Produto</label>
              <input
                id="preco"
                type="number"
                className="form-input"
                placeholder="0.00"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="imagem">Imagem (URL)</label>
              <input
                id="imagem"
                type="url"
                className="form-input"
                placeholder="https://exemplo.com/imagem.jpg"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Categoria</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="tipo"
                    value="1"
                    checked={tipo === "1"}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <span>Camisas</span>
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="tipo"
                    value="2"
                    checked={tipo === "2"}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <span>Acessórios</span>
                </label>
              </div>
            </div>

            <button type="submit" className="register-submit-btn">
              Cadastrar Produto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;