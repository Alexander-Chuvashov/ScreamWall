import { Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { AuthProvider } from './context/AuthContext';
import Wall from './pages/Wall';
import Create from './pages/Create';
import Auth from './pages/Auth';

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <Routes>
                    <Route path="/" element={<Wall />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
