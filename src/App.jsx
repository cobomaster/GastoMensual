import './App.css';
import FormularioGasto from './FormularioGasto';
import ListaGastosApp from './ListaGastos';

function App() {
  return (
    <div className="app-container">
      <header className="hea">
        <h1>Gasto Mensual</h1>
      </header>

      <main>
        <ListaGastosApp />
      </main>
    </div>
  );
}

export default App;
