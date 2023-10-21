import React, { useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { fetchTodos } from './store/todos';
import { fetchLogin } from './store/login';
import './App.css';
import { ToDoWrapper } from './components/ToDoWrapper/ToDoWrapper';
import { Login } from './components/LoginForm/Login';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes strings
    },
  });


export const URL = process.env.REACT_APP_SERVER_URL;

export const App = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    // Assuming you have a fetchLogin action
    dispatch(fetchLogin().then((response) => {
      if (response.error) {
        // Handle the error here
        console.log('Login failed:', response.payload.error);
      } else {
        // Login was successful
        console.log('Login successful');
      }
    }));
  };

  useEffect(() => {
    dispatch(fetchLogin()); // Uncomment this line if needed
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login onFormSubmit={handleFormSubmit} />} />
            <Route path="/dashboard" element={<ToDoWrapper/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
