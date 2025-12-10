import Header from "../Components/header";
import Card from "../Components/CardItem";
import { useState } from "react";


function Home() {
  const [filtroTipo, setFiltroTipo] = useState(null)

  return (
    <>
      <Header setFiltroTipo={setFiltroTipo} filtroTipo={filtroTipo} />
      <Card filtroTipo={filtroTipo}/>
    </>
  );
}

export default Home;
