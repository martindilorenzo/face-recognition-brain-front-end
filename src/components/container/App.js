import './App.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Form from '../Form/Form';
import { useCallback, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { optionsParticles } from './optionsParticles';


const App = () => {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ''
  });

  const initialState = () => {
    setInput('');
    setImageUrl('');
    setBoxes([]);
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: "",
      name: "",
      email: "",
      password: "",
      entries: 0,
      joined: ''
    });
  }

  
  //Iniciar fondo de particulas
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const calculateFaceLocation = (data) => {
    const boxesFace = data.outputs[0].data.regions.map((box) => {
      const ClarifaiFace = box.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
  
      return {
        leftCol: ClarifaiFace.left_col * width,
        topRow: ClarifaiFace.top_row * height,
        rigthCol: width - (ClarifaiFace.right_col * width),
        bottomRow: height - (ClarifaiFace.bottom_row * height)
      }
    })

    return boxesFace;   
  }

  const displayFaceBox = (boxesFace) => {
    setBoxes(boxesFace);
  }

  const loadUser = (data) => {
    setUser(data);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onPictureSubmit = async () => {
    try {
      setImageUrl(input);
      const response = await fetch('https://brain-api.onrender.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: input
        })
      })
      if (response.ok) {
        fetch('https://brain-api.onrender.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            setUser({ ...user, entries: count });
          })
          .catch("error fetch /image :", console.log)
      }
      const data = await response.json();
      displayFaceBox(calculateFaceLocation(data))
  }
    catch (error) {
    console.log('error fetch /imageurl :', error);
  }
}

const onRouteChange = (route) => {
  if (route === 'signout') {
    initialState();
  } else if (route === 'home') {
    setIsSignedIn(true);
  }
  setRoute(route);
}




return (
  <div className="App">
    <Particles
      className="particles"
      id="tsparticles"
      init={particlesInit}
      options={optionsParticles}
    />
    <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
    {route === 'home'
      ?
      <div>
        <Logo />
        <Rank
          name={user.name}
          entries={user.entries}
        />
        <ImageLinkForm
          onInputChange={onInputChange}
          onPictureSubmit={onPictureSubmit}
        />
        <FaceRecognition
          boxes={boxes}
          imageUrl={imageUrl}
        />
      </div>
      :
      <Form route={route} onRouteChange={onRouteChange} loadUser={loadUser} />

    }
  </div>
);

}

export default App;
