import { useState } from 'react';
import axios from 'axios';


function App() {
const [emiData, setEmiData] = useState({ amount: '', rate: '', months: '' });
const [emi, setEmi] = useState(null);
const [bmiData, setBmiData] = useState({ weight: '', height: '' });
const [bmi, setBmi] = useState(null);
const [ageData, setAgeData] = useState({ birthYear: '' });
const [age, setAge] = useState(null);
const [text, setText] = useState('');
const [encoded, setEncoded] = useState('');


const handleEMI = async (e) => {
e.preventDefault();
const res = await axios.post('http://localhost:5000/api/calculator/emi', emiData);
setEmi(res.data.emi);
};

const handleBMI = async (e) => {
e.preventDefault();
const res = await axios.post('http://localhost:5000/api/calculator/bmi', bmiData);
setBmi(res.data.bmi);
};

const handleAge = async (e) => {
e.preventDefault();
const res = await axios.post('http://localhost:5000/api/calculator/age', ageData);
setAge(res.data.age);
};


const handleEncode = async (e) => {
e.preventDefault();
const res = await axios.post('http://localhost:5000/api/seo/base64-encode', { text });
setEncoded(res.data.encoded);
};


return (
<div className="min-h-screen bg-gray-50 flex flex-wrap justify-center items-start gap-6 p-6">
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

<div className="bg-white shadow-md p-6 rounded-2xl w-80">
<h2 className="text-xl font-bold mb-4 text-center">BMI Calculator</h2>
<form onSubmit={handleBMI} className="space-y-3">
<input type="number" placeholder="Weight in kg" onChange={e => setBmiData({...bmiData, weight: e.target.value})} className="border p-2 w-full" />
<input type="number" placeholder="Height in cm" onChange={e => setBmiData({...bmiData, height: e.target.value})} className="border p-2 w-full" />
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
</form>
{bmi && <p className="mt-4 text-center font-semibold">BMI: {bmi}</p>}
</div>

<div className="bg-white shadow-md p-6 rounded-2xl w-80">
<h2 className="text-xl font-bold mb-4 text-center">Age Calculator</h2>
<form onSubmit={handleAge} className="space-y-3">
<input type="number" placeholder="Enter Birth Year" onChange={e => setAgeData({...ageData, birthYear: e.target.value})} className="border p-2 w-full" />
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
</form>
{age && <p className="mt-4 text-center font-semibold">Age: {age}</p>}
</div>

<div className="bg-white shadow-md p-6 rounded-2xl w-80">
<h2 className="text-xl font-bold mb-4 text-center">Base64 Encoder</h2>
<textarea placeholder="Enter text" onChange={e => setText(e.target.value)} className="border p-2 w-full" rows="3"></textarea>
<button onClick={handleEncode} className="bg-green-600 text-white px-4 py-2 rounded w-full mt-3">Encode</button>
{encoded && <textarea value={encoded} readOnly className="border p-2 w-full mt-3" rows="3"></textarea>}
</div>
</div>

);
}


export default App;