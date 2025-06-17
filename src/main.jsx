import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "./components/ui/provider.jsx";
import {Theme} from "@chakra-ui/react";

createRoot(document.getElementById('root')).render(
    <Provider>
        <Theme appearance={'dark'}>
            <StrictMode>
                <App />
            </StrictMode>
        </Theme>
    </Provider>
)
