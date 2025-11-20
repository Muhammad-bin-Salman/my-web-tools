import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EMICalculator from './components/EMICalculator';
import BMICalculator from './components/BMICalculator';
import AgeCalculator from './components/AgeCalculator';
import Base64Encoder from './components/Base64Encoder';
import Home from './components/Home';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/emi-calculator" element={<EMICalculator />} />
                <Route path="/bmi-calculator" element={<BMICalculator />} />
                <Route path="/age-calculator" element={<AgeCalculator />} />
                <Route path="/base64-encoder" element={<Base64Encoder />} />
            </Routes>
        </Router>
    );
}


export default App;