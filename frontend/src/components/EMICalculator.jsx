import Layout from "./Layout";
import {useState} from 'react';
import axios from 'axios';

function EMICalculator(){
    const [emiData, setEmiData] = useState({amount: '', rate: '', months: ''});
    const [emi, setEmi] = useState(null);

    const handleEMI = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/calculator/emi', emiData);
        setEmi(res.data.emi);
    }

    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md p-6 rounded-2xl w-80">
                    <h2 className="text-xl font-bold mb-4 text-center">Loan EMI Calculator</h2>
                    <form onSubmit={handleEMI} className="space-y-3">
                        <input type="number" placeholder="Loan Amount" onChange={e => setEmiData({...emiData, amount: e.target.value})} className="border p-2 w-full" />
                        <input type="number" placeholder="Interest Rate" onChange={e => setEmiData({...emiData, rate: e.target.value})} className="border p-2 w-full" />
                        <input type="number" placeholder="Months" onChange={e => setEmiData({...emiData, months: e.target.value})} className="border p-2 w-full" />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
                    </form>
                    {emi && <p className="mt-4 text-center font-semibold">Monthly EMI: {emi}</p>}
                </div>
            </div>
        </Layout>
    );
}

export default EMICalculator;