import Layout from './Layout';
import {useState} from 'react';
import axios from 'axios';

function URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // "encode" or "decode"
  const [error, setError] = useState("");

  const handleRun = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "encode") {
        // encodeURIComponent is the correct browser method
        setOutput(encodeURIComponent(input));
      } else {
        // decodeURIComponent can throw if input is malformed
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setError("Invalid input for decoding. Please check the encoded string.");
      setOutput("");
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // simple feedback (could be improved)
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed — select and copy manually");
    }
  };

  const handleSwap = () => {
    // swap input/output and toggle mode sensibly
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="bg-white shadow-md p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-4">URL Encoder / Decoder</h1>
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${mode === "encode" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                onClick={() => setMode("encode")}
              >
                Encode
              </button>
              <button
                className={`px-3 py-1 rounded ${mode === "decode" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                onClick={() => setMode("decode")}
              >
                Decode
              </button>
              <button
                onClick={handleSwap}
                className="ml-auto px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                title="Swap output into input and toggle mode"
              >
                Swap ↔
              </button>
            </div>
            <form onSubmit={handleRun} className="space-y-3">
              <label className="block text-sm font-medium">Input</label>
              <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border rounded p-2"
                placeholder={mode === "encode" ? "Enter text / URL to encode" : "Enter encoded string to decode"}
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  {mode === "encode" ? "Encode" : "Decode"}
                </button>
                <button
                  type="button"
                  onClick={() => { setInput(""); setOutput(""); setError(""); }}
                  className="bg-gray-100 px-4 py-2 rounded"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => { navigator.clipboard.readText().then(txt => setInput(txt)).catch(()=>alert('Paste failed')) }}
                  className="ml-auto bg-gray-100 px-4 py-2 rounded"
                  title="Paste from clipboard"
                >
                  Paste
                </button>
              </div>
            </form>
            {error && <p className="text-red-600">{error}</p>}
            <label className="block text-sm font-medium">Output</label>
            <textarea
              readOnly
              rows={4}
              value={output}
              className="w-full border rounded p-2 bg-gray-50"
              placeholder="Result appears here"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(output)}
                disabled={!output}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Copy Output
              </button>
              <button
                onClick={() => { setOutput(""); }}
                className="bg-gray-100 px-4 py-2 rounded"
              >
                Clear Output
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Uses <code>encodeURIComponent</code> and <code>decodeURIComponent</code>. For full URL encoding (including path & query), paste the entire URL. Decoding malformed strings may fail.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default URLEncoderDecoder;