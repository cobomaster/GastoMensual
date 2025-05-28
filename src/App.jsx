import './App.css'
import FormularioGasto from './FormularioGasto';
import ListaGastosApp from './ListaGastos';

function App() {
  return (
    <>
      <h1 className='hea'> Gasto Mensual</h1> 
      <FormularioGasto/>
      <ListaGastosApp/>
      
    </>
  )
}

export default App