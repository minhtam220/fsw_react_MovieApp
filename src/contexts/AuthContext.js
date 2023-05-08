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
    window.localStorage.setItem("username", username);
    const savedMovies = [
      {
        adult: false,
        backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
        belongs_to_collection: null,
        budget: 63000000,
        genres: [
          { id: 18, name: "Drama" },
          { id: 53, name: "Thriller" },
          { id: 35, name: "Comedy" },
        ],
        homepage: "http://www.foxmovies.com/movies/fight-club",
        id: 550,
        imdb_id: "tt0137523",
        original_language: "en",
        original_title: "Fight Club",
        overview:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        popularity: 62.74,
        poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        production_companies: [
          {
            id: 508,
            logo_path: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
            name: "Regency Enterprises",
            origin_country: "US",
          },
          {
            id: 711,
            logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
            name: "Fox 2000 Pictures",
            origin_country: "US",
          },
          {
            id: 20555,
            logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
            name: "Taurus Film",
            origin_country: "DE",
          },
          {
            id: 54051,
            logo_path: null,
            name: "Atman Entertainment",
            origin_country: "",
          },
          {
            id: 54052,
            logo_path: null,
            name: "Knickerbocker Films",
            origin_country: "US",
          },
          {
            id: 4700,
            logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
            name: "The Linson Company",
            origin_country: "US",
          },
          {
            id: 25,
            logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            name: "20th Century Fox",
            origin_country: "US",
          },
        ],
        production_countries: [
          { iso_3166_1: "US", name: "United States of America" },
        ],
        release_date: "1999-10-15",
        revenue: 100853753,
        runtime: 139,
        spoken_languages: [
          { english_name: "English", iso_639_1: "en", name: "English" },
        ],
        status: "Released",
        tagline: "Mischief. Mayhem. Soap.",
        title: "Fight Club",
        video: false,
        vote_average: 8.433,
        vote_count: 26341,
      },
      {
        adult: false,
        backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
        belongs_to_collection: null,
        budget: 63000000,
        genres: [
          { id: 18, name: "Drama" },
          { id: 53, name: "Thriller" },
          { id: 35, name: "Comedy" },
        ],
        homepage: "http://www.foxmovies.com/movies/fight-club",
        id: 550,
        imdb_id: "tt0137523",
        original_language: "en",
        original_title: "Fight Club",
        overview:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        popularity: 62.74,
        poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        production_companies: [
          {
            id: 508,
            logo_path: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
            name: "Regency Enterprises",
            origin_country: "US",
          },
          {
            id: 711,
            logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
            name: "Fox 2000 Pictures",
            origin_country: "US",
          },
          {
            id: 20555,
            logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
            name: "Taurus Film",
            origin_country: "DE",
          },
          {
            id: 54051,
            logo_path: null,
            name: "Atman Entertainment",
            origin_country: "",
          },
          {
            id: 54052,
            logo_path: null,
            name: "Knickerbocker Films",
            origin_country: "US",
          },
          {
            id: 4700,
            logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
            name: "The Linson Company",
            origin_country: "US",
          },
          {
            id: 25,
            logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            name: "20th Century Fox",
            origin_country: "US",
          },
        ],
        production_countries: [
          { iso_3166_1: "US", name: "United States of America" },
        ],
        release_date: "1999-10-15",
        revenue: 100853753,
        runtime: 139,
        spoken_languages: [
          { english_name: "English", iso_639_1: "en", name: "English" },
        ],
        status: "Released",
        tagline: "Mischief. Mayhem. Soap.",
        title: "Fight Club",
        video: false,
        vote_average: 8.433,
        vote_count: 26341,
      },
    ];

    window.localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { username } },
    });
    callback();
  };

  const logout = async (callback) => {
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
