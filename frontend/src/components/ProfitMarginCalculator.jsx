import Layout from './Layout';
import {useState} from 'react';
import axios from 'axios';

function ProfitMarginCalculator(){
    const [profitMarginData, setProfitMarginData] = useState({cost: '', revenue: ''});
    const [profitMargin, setProfitMargin] = useState(null);

    const handleProfitMargin = async(e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/calculator/profitMargin', profitMarginData);
        setProfitMargin(res.data.profitMargin);
    }

    return(
        <Layout>
            <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
                <div className="bg-white shadow-md p-6 rounded-2xl w-80">
                    <h2 className="text-xl font-bold mb-4 text-center">Profit Margin Calculator</h2>
                    <form onSubmit={handleProfitMargin} className="space-y-3">
                        <input type="number" placeholder="Cost" onChange={e => setProfitMarginData({...profitMarginData, cost: e.target.value})} className="border p-2 w-full" />
                        <input type="number" placeholder="Revenue" onChange={e => setProfitMarginData({...profitMarginData, revenue: e.target.value})} className="border p-2 w-full" />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
                    </form>
                    {profitMargin && <p className="mt-4 text-center font-semibold">Profit Margin: {profitMargin}%</p>}
                </div>
            </div>
        </Layout>
    )
}

export default ProfitMarginCalculator;