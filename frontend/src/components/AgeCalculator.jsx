import Layout from "./Layout";
import {useState} from 'react';
import axios from 'axios';

function AgeCalculator() {
    const [ageData, setAgeData] = useState({birthYear: ''});
    const [age, setAge] = useState(null);

    const handleAge = async(e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/calculator/age', ageData);
        setAge(res.data.age);
    }

    return(
        <Layout>
            <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
                <div className="bg-white shadow-md p-6 rounded-2xl max-w-sm">
                    <h2 className="text-xl font-bold mb-4 text-center">Age Calculator</h2>
                    <form onSubmit={handleAge} className="space-y-3">
                        <input type="number" placeholder="Birth Year" onChange={e => setAgeData({...ageData, birthYear: e.target.value})} className="border p-2 w-full" />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
                    </form>
                    {age && <p className="mt-4 text-center font-semibold">Age: {age}</p>}
                </div>
            </div>
        </Layout>
    )
}

export default AgeCalculator;