
import './index.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './dashboard';
import LoginPage from './dashboard/Login';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateUser = localStorage.getItem("isAuthentication");
    if (authenticateUser) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <div>
      <ToastContainer position="top-right" />
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className='login_main'>
          <LoginPage onLogin={() => setIsAuthenticated(true)} />
        </div>
      )}
    </div>
  );
}

export default App;
