import Header from "../Components/header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Product() {
  const { id } = useParams();   
  const [produto, setProduto] = useState(null);
  const { addToCart } = useContext(CartContext);
 
  useEffect(() => {
    async function fetchProduto() {
      const docRef = doc(db, "produtos", id);  
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setProduto({
          id: snap.id,
          ...snap.data()
        });
      } else {
        console.log("Produto não encontrado");
      }
    }
      fetchProduto();
    }, [id]);

  if (!produto) {
    return (
      <>
        <Header />
        <p className="produto-carregando">Carregando produto...</p>
      </>
    );
  }
  
  return (
    <>
        <Header/>

        <div className="produto-container">
          <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
          <h1>{produto.nome}</h1>
          <p className="produto-preco">R$ {produto.preco}</p>
          <Button variant="danger" onClick={() => {addToCart(produto)}}>Comprar</Button>
        </div>

    </>
  );
}

export default Product;
