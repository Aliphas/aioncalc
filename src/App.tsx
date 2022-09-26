import './App.css';
import { RecoilRoot } from 'recoil';
import AionCalc from './components/aionCalc/AionCalc';


function App() {

  return (
    <RecoilRoot>
      <div className="App">
        <AionCalc />
      </div>
    </RecoilRoot>
  );
}

export default App;
