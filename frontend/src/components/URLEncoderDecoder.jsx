import Layout from './Layout';
import { useState } from 'react';

function URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // "encode" or "decode"
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = (e) => {
    e.preventDefault();
    setError("");
    setCopied(false);

    if (!input.trim()) {
      setError("Please enter some text");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setError("Invalid encoded string — cannot decode");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
    setCopied(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
        <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            URL Encoder / Decoder
          </h1>

          <div className="bg-white p-6 rounded-2xl space-y-6">
            {/* Mode Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { setMode("encode"); setError(""); }}
                className={`px-6 py-2.5 rounded-lg font-medium transition ${
                  mode === "encode"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => { setMode("decode"); setError(""); }}
                className={`px-6 py-2.5 rounded-lg font-medium transition ${
                  mode === "decode"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Decode
              </button>
              <button
                onClick={handleSwap}
                className="ml-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition shadow-md flex items-center gap-2"
                title="Swap input ↔ output"
              >
                Swap
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleRun} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input
                </label>
                <textarea
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-mono text-sm resize-none"
                  placeholder={mode === "encode" ? "Enter text or URL to encode..." : "Paste encoded URL here..."}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-md"
                >
                  {mode === "encode" ? "Encode" : "Decode"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                >
                  Clear All
                </button>

                <button
                  type="button"
                  onClick={() => navigator.clipboard.readText().then(setInput).catch(() => alert("Paste failed"))}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                >
                  Paste
                </button>
              </div>
            </form>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center font-medium">
                {error}
              </div>
            )}

            {/* Output */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output
              </label>
              <textarea
                readOnly
                rows={2}
                value={output}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm resize-none"
                placeholder="Result appears here..."
              />
            </div>

            {/* Output Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                disabled={!output}
                className={`px-8 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white disabled:cursor-not-allowed"
                }`}
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>

              <button
                onClick={() => setOutput("")}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
              >
                Clear Output
              </button>
            </div>

            {/* Info */}
            <div className="text-xs text-gray-500 text-center mt-6 bg-gray-50 p-4 rounded-lg">
              Uses native <code>encodeURIComponent()</code> and <code>decodeURIComponent()</code> • 
              Perfect for query strings, URLs, and form data • 
              Works offline • No data sent to server
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default URLEncoderDecoder;