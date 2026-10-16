import { BrowserRouter as Router } from 'react-router-dom';
import RootRoutes from './routes/RootRoutes';
import './styles/main.scss';
import { LanguageProvider } from './hooks/languageHook/LanguageContext';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <RootRoutes />
      </Router>
    </LanguageProvider>
  );
};

export default App;
