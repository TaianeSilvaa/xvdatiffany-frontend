import logo from './logo.svg';
import './App.css';
import './componets/UploadFotos';
import UploadFotos from './componets/UploadFotos';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuscarImagens from './componets/BuscarImagens';

function App() {
  return (
    <div className="App">
      <div className='fotoFundo'>
        <UploadFotos></UploadFotos>
      </div>
      <div className='backgroundBranco'>
        <BuscarImagens />
      </div>
    </div>
  );
}

export default App;
