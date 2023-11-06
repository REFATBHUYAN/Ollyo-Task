import './App.css';
import { useState } from 'react';
import update from 'immutability-helper';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'
import img5 from './assets/5.png'
import img6 from './assets/6.png'
import img7 from './assets/7.png'
import img8 from './assets/8.png'
import img9 from './assets/9.png'
import img10 from './assets/home.png'
import img11 from './assets/telephone.png'
import addImg from './assets/add.png'
import LayoutImg from './Components/LayoutImg/LayoutImg';


const App = () => {
  // img data
    const images = [
        {
          id: 1,
          name: img1,
        },
        {
          id: 2,
          name: img2,
        },
        {
          id: 3,
          name: img3,
        },
        {
          id: 4,
          name: img4,
        },
        {
          id: 5,
          name: img5,
        },
        {
          id: 6,
          name: img6,
        },
        {
          id: 7,
          name: img7,
        },
        {
          id: 8,
          name: img8,
        },
        {
          id: 9,
          name: img9,
        },
        {
          id: 10,
          name: img10,
        },
        {
          id: 11,
          name: img11,
        },
      ];
      const [state, setState] = useState({
        count: 0,
        selected: [],
        allImage: images,
        addImg: [],
      });
    
      const { count, allImage, selected } = state;
    // delete files handle functions
      const handelDelete = () => {
        const commonIds = allImage
          .filter((objA) => selected.some((objB) => objB === objA.id))
          .map((obj) => obj.id);
    
        const newArray = [...allImage].filter((obj) => !commonIds.includes(obj.id));
    
        setState({
          ...state,
          count: 0,
          selected: [],
          allImage: newArray,
        });
      };
  // moving within grid functions   

  const moveGrid = (dragIndex, hoverIndex) => {
    const dragCard = allImage[dragIndex];
    setState(
      update(state, {
        allImage: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        },
      })
    );
  };
// image upload function handle
  const handelImageUpload = (e) => {
    const newImage = {
      id: allImage.length + 1,
      name: URL.createObjectURL(e.target.files[0]),
    };
    setState({
      ...state,
      allImage: [...allImage, newImage],
    });
  };

    return (
        <div className="photo-gallery">
      {/* photo Header */}
      <div className="gallery-header">
        {count > 0 ? (
          <>
            <h3>
              <input type="checkbox" defaultChecked={true} /> {count} File
              Selected
            </h3>
            <p className="delete-file" onClick={handelDelete}>
              Delete files
            </p>
          </>
        ) : (
          <>
            <h3>Gallery</h3>
          </>
        )}
      </div>
      {/* photo gallery */}
      <DndProvider backend={HTML5Backend}>
        <div 
        className="image-grid"
        
        >
          {allImage.map((image, index) => (
            <LayoutImg
              key={index}
              image={image}
              index={index}
              state={state}
              handelSet={setState}
              moveGrid={moveGrid}
            />
          ))}
          <div
            style={{
              border: "2px dotted gray",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <img src={addImg} alt="addImage" />
            <input
              className="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handelImageUpload}
            />
          </div>
        </div>
      </DndProvider>
    </div>
    );
};

export default App;
