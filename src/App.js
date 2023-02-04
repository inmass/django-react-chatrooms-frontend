import { Router } from "@router/Router";
import { AuthProvider } from "@context/auth/AuthContext";

const App = props => <AuthProvider><Router /></AuthProvider>

export default App;
