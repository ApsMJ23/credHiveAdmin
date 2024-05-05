import './App.scss'
import {BrowserRouter} from "react-router-dom";
import RootRoutes from "./routes/RootRoutes.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <RootRoutes/>
        </BrowserRouter>

    )
}

export default App