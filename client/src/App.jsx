import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import ListCities from './components/ListCities';


function App() {

  return (
    <div className="App">
      <h2 id="title"> City Weather Search  </h2>
      <div img="divimages">
      <img class="images" id="imagetitle" src='https://cdn-icons-png.flaticon.com/512/9985/9985865.png'></img>
      <img class="images" id="imagetitle3" src='https://cdn-icons-png.flaticon.com/512/9985/9985964.png'></img>
      <img class="images" id="imagetitle2" src='https://cdn-icons-png.flaticon.com/512/3767/3767036.png'></img>
      </div>
      <ListCities />

    </div>
  )
}

export default App
