import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import api from './services/api';
import './style.css';


function App() {

  const [Input,setInput] = useState('');
  const [cep, setCep] =useState({})


  async function searchCep(){
    if (Input === ''){
      alert("Por favor, digite o CEP!");
      return;
    }

    try {
      const response = await api.get(`${Input}/json`);
      setCep(response.data);
      setInput("");
    } catch{
      alert("Erro ao buscar o CEP, tente novamente!");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1>Buscador de CEP</h1>

      <div className="inputContainer">
        <input 
          type="text"
          placeholder="Informe CEP desejado"
          value={Input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="search" onClick={searchCep}>
          <IoMdSearch size={25} color="#fff"/>
        </button>
      </div>
        
        {Object.keys(cep).length > 0 && ( 
          <main className="mainSearch">
            <h2>{cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
        
    </div>
  );
}

export default App;
