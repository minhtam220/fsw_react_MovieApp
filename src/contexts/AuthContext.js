import { createContext, useReducer, useEffect } from "react";

//initialize the state
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const INITIALIZE = "INITIALIZE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

//function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

//declare the context and set initial values
const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const username = window.localStorage.getItem("username");

        if (username) {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: { username } },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (username, callback) => {
    // get the userdata array
    const userdata = JSON.parse(window.localStorage.getItem("userdata"));
    // get the current user data
    const currentUserdata = userdata.filter(
      (item) => item.username === username
    )[0];

    const savedMovies = currentUserdata["savedMovies"];

    const data = JSON.parse(window.localStorage.getItem("userdata"));
    window.localStorage.setItem("username", username);

    window.localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { username } },
    });
    callback();
  };

  const logout = async (callback) => {
    const newData = {
      username: window.localStorage.getItem("username"),
      savedMovies: JSON.parse(window.localStorage.getItem("savedMovies")),
    };

    const userdata = JSON.parse(window.localStorage.getItem("userdata"));

    const newUserdata = userdata.filter(
      (item) => item.username !== newData.username
    );

    newUserdata.push(newData);

    //save the array as string in local storage
    window.localStorage.setItem("userdata", JSON.stringify(newUserdata));

    window.localStorage.removeItem("username");
    window.localStorage.removeItem("imageUrl");
    window.localStorage.removeItem("savedMovies");

    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
