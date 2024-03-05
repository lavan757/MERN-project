import { Routes, Route } from 'react-router-dom'
import Login from './components/login';
import { Toaster } from 'react-hot-toast';
import Home from './components/home';
import ProtectedRoute from './helper/auth';
import Page404 from './components/404';

function App() {

  return (
    <div>
      <Toaster
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }} />
      <div>
        <div className="container mt-3">
          <Routes >
            <Route path='/' element={<Login />} />
            <Route path='/home' element={(
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            )} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
