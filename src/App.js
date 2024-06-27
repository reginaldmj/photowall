import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import { ACTIONS, initialState, photoReducer } from "./photoReducer";

// This URL can be combined with a photo id to fetch a photo.
const PHOTO_URL = (photoId) => `https://picsum.photos/id/${photoId}/200/200`;
// This URL can be used to get an array of objects that contain information
// about various photos.
const PHOTO_LIST_URL = "https://picsum.photos/list";

export const App = () => {
  const [state, dispatch] = useReducer(photoReducer, initialState);
  const [photosArr, setPhotosArr] = useState([]);

  // Fetches photos on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await (await fetch(PHOTO_LIST_URL)).json();
        setPhotosArr(data);
        dispatch({ type: ACTIONS.FETCHED_PHOTOS, payload: { visiblePhotos: toJSX(data, 0, state.photosPerLoad) } });
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
    return () => {
      fetchPhotos();
    };
  }, [state.photosPerLoad]);

  // returns JSX tags for each image in a givenlist of photos
  const toJSX = (photosArr, firstPhoto, lastPhoto) => {
    return photosArr.slice(firstPhoto, lastPhoto).map((photo) => <img alt={photo.filename} key={photo.id} src={PHOTO_URL(photo.id)} />);
  };

  // Handles loading new batch of photos to state when user requests more
  const loadMorePhotos = (nextBatch) => {
    const timesLoaded = state.timesLoaded + 1;
    const startIndex = timesLoaded * state.photosPerLoad;
    const endIndex = startIndex + state.photosPerLoad;
    const upcomingPhotos = toJSX(photosArr, startIndex, endIndex);
    const visiblePhotos = state.visiblePhotos.concat(upcomingPhotos);
    dispatch({
      type: ACTIONS.LOAD_PHOTOS,
      payload: {
        timesLoaded,
        startIndex,
        endIndex,
        upcomingPhotos,
        visiblePhotos,
      },
    });
  };

  return (
    <>
      <header>
        <h1>Photo Wall</h1>
      </header>
      <div className="collage">{state.visiblePhotos}</div>
      <button onClick={() => loadMorePhotos(state.upcomingPhotos)}>Show me what you got</button>
    </>
  );
};

export default App;
