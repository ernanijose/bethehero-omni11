import React from 'react';

import './global.css';

//import Logon from './pages/Logon';
import Routes from './routes';

function App() {
    //toda vez que tiver useState, ele retorna um array com a variavel e uma função para alterar o valor
    //ou seja, counter vai ser [counter, setCounter]
    /*const [counter, setCounter] = useState(0);
    function increment(){
        setCounter(counter + 1);
    }*/
    
    return (
        <> 
        <Routes />
        </>
    );
}

export default App;