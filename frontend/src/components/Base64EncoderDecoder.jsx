import Layout from './Layout';
import { useState } from 'react';
import axios from 'axios';

function Base64EncoderDecoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("encode"); // "encode" or "decode"
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRun = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
        setError("Please enter some text");
        return;
        }

        setError("");
        setLoading(true);

        try {
        const endpoint =
            mode === "encode"
            ? "/api/seo/base64-encode"
            : "/api/seo/base64-decode";

        const response = await axios.post(
            `http://localhost:5000${endpoint}`,
            { text: input }
        );

        setOutput(response.data.encoded || response.data.decoded || "");
        } catch (err) {
        const msg = err.response?.data?.error || err.message;
        setError(
            mode === "encode"
            ? "Encoding failed. Please try again."
            : "Invalid Base64 string. Cannot decode."
        );
        setOutput("");
        } finally {
        setLoading(false);
        }
    };

    const handleCopy = async (text) => {
        try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
        } catch {
        alert("Copy failed — select and copy manually");
        }
    };

    const handleSwap = () => {
        setInput(output);
        setOutput("");
        setMode(mode === "encode" ? "decode" : "encode");
        setError("");
    };

    return (
        <Layout>
        <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
            <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Base64 Encoder / Decoder
            </h1>

            <div className="bg-white p-6 rounded-2xl space-y-6">
                {/* Mode Buttons */}
                <div className="flex gap-2">
                <button
                    onClick={() => setMode("encode")}
                    className={`px-4 py-2 rounded font-medium transition ${
                    mode === "encode"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Encode
                </button>
                <button
                    onClick={() => setMode("decode")}
                    className={`px-4 py-2 rounded font-medium transition ${
                    mode === "decode"
                        ? "bg-blue-600 text-white"
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

                {/* Form */}
                <form onSubmit={handleRun} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Input
                    </label>
                    <textarea
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-mono text-sm"
                    placeholder={
                        mode === "encode"
                        ? "Enter text to encode..."
                        : "Enter Base64 string to decode..."
                    }
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2"
                    >
                    {loading ? "Processing..." : mode === "encode" ? "Encode" : "Decode"}
                    </button>

                    <button
                    type="button"
                    onClick={() => {
                        setInput("");
                        setOutput("");
                        setError("");
                    }}
                    className="bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-lg font-medium transition"
                    >
                    Clear All
                    </button>

                    <button
                    type="button"
                    onClick={() =>
                        navigator.clipboard
                        .readText()
                        .then(setInput)
                        .catch(() => alert("Paste failed"))
                    }
                    className="bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-lg font-medium transition"
                    >
                    Paste
                    </button>
                </div>
                </form>

                {/* Error */}
                {error && <p className="text-red-600 font-medium text-center">{error}</p>}

                {/* Output */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Output
                </label>
                <textarea
                    readOnly
                    rows={2}
                    value={output}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 font-mono text-sm"
                    placeholder="Result will appear here..."
                />
                </div>

                {/* Output Actions */}
                <div className="flex gap-3">
                <button
                    onClick={() => handleCopy(output)}
                    disabled={!output}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:cursor-not-allowed"
                >
                    Copy Output
                </button>
                <button
                    onClick={() => setOutput("")}
                    className="bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-lg font-medium transition"
                >
                    Clear Output
                </button>
                </div>

                <div className="text-xs text-gray-500 text-center mt-4">
                Powered by your backend API • Works with text, JSON, files (as text), and more!
                </div>
            </div>
            </div>
        </div>
        </Layout>
    );
}

export default Base64EncoderDecoder;