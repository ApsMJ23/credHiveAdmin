import './App.scss'
import {BrowserRouter} from "react-router-dom";
import RootRoutes from "./routes/RootRoutes.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <RootRoutes/>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    )
}

export default App