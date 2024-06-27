const PHOTOS_PER_LOAD = 10;

export const initialState = {
  photosPerLoad: PHOTOS_PER_LOAD,
  visiblePhotos: [],
  upcomingPhotos: [],
  timesLoaded: 0,
  startIndex: 1 * PHOTOS_PER_LOAD,
  endIndex: 2 * PHOTOS_PER_LOAD,
};

export const ACTIONS = {
  FETCHED_PHOTOS: "FETCHED_PHOTOS",
  LOAD_PHOTOS: "LOAD_PHOTOS",
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCHED_PHOTOS:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.LOAD_PHOTOS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return initialState;
  }
};
