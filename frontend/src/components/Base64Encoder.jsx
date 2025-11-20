import Layout from "./Layout";
import {useState} from 'react';
import axios from 'axios';

function Base64Encoder(){
    const [text, setText] = useState('');
    const [encoded, setEncoded] = useState('');

    const handleEncode = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/seo/base64-encode', { text });
        setEncoded(res.data.encoded);
    };

    return(
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md p-6 rounded-2xl w-80">
                    <h2 className="text-xl font-bold mb-4 text-center">Base64 Encoder</h2>
                    <textarea placeholder="Enter text" onChange={e => setText(e.target.value)} className="border p-2 w-full" rows="3"></textarea>
                    <button onClick={handleEncode} className="bg-green-600 text-white px-4 py-2 rounded w-full mt-3">Encode</button>
                    {encoded && <textarea value={encoded} readOnly className="border p-2 w-full mt-3" rows="3"></textarea>}
                </div>
            </div>
        </Layout>
    )
}

export default Base64Encoder;