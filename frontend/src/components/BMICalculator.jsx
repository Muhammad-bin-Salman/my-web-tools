import Layout from "./Layout";
import {useState} from 'react';
import axios from 'axios';

function BMICalculator(){
    const [bmiData, setBmiData] = useState({weight: '', height: ''});
    const [bmi, setBmi] = useState(null);

    const handleBMI = async(e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/calculator/bmi', bmiData);
        setBmi(res.data.bmi);
    }

    return(
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md p-6 rounded-2xl w-80">
                    <h2 className="text-xl font-bold mb-4 text-center">BMI Calculator</h2>
                    <form onSubmit={handleBMI} className="space-y-3">
                        <input type="number" placeholder="Weight in kg" onChange={e => setBmiData({...bmiData, weight: e.target.value})} className="border p-2 w-full" />
                        <input type="number" placeholder="Height in cm" onChange={e => setBmiData({...bmiData, height: e.target.value})} className="border p-2 w-full" />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
                    </form>
                    {bmi && <p className="mt-4 text-center font-semibold">BMI: {bmi}</p>}
                </div>
            </div>
        </Layout>
    )
}

export default BMICalculator;