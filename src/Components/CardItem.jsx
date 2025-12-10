import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";



function Card ({filtroTipo = null}){
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    

    function abrirProduto(id) {
        navigate(`/produto/${id}`);
  }

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
    async function fetchProdutos() {
      const produtosRef = collection(db, "produtos");
      const snapshot = await getDocs(produtosRef);
      
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProdutos(lista);
    }

    fetchProdutos();
  }, []);


  const filteredProdutos = produtos.filter((item) => {
    console.log(filtroTipo);
    if (filtroTipo === null) return true; 
    return item.tipo === filtroTipo;
  });
  

  return (
    <div>
      {produtos.length === 0 && <p className="card-loading">Carregando...</p>}

      <div className="cards-container">
        {filteredProdutos.map((item) => (
          <div 
            key={item.id} 
            className="card-item"
            onClick={() => abrirProduto(item.id)}
            style={{ cursor: "pointer" }}
            >
              <img src={item.imagem} alt={item.nome} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{item.nome}</h3>
                <p className="card-price">R$ {item.preco}</p>
                {item.descricao && <p className="card-description">{item.descricao}</p>}
                <div className="card-actions">
                    <Button variant="danger">Comprar</Button>
                    
                    <Button variant="light" 
                    onClick={(e) => { 
                    e.stopPropagation();  
                    addToCart(item);
                    toast.success("Produto adicionado ao carrinho!");
                   }
                    }>
                    <ShoppingCart/>
                    </Button>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
