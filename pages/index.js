import React, { useState } from 'react';

export default function BomberHome() {
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [pass, setPass] = useState('');
  const [isUltimate, setIsUltimate] = useState(false);
  const [status, setStatus] = useState('READY');

  const handleUnlock = () => {
    if (pass === "PROVIDER_1_KEY") {
      setIsUltimate(true);
      alert("ULTIMATE MODE UNLOCKED!");
    } else {
      alert("INVALID PASS!");
    }
  };

  const startAttack = async () => {
    setStatus('ATTACKING...');
    const res = await fetch('/api/attack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, amount, isUltimate }),
    });
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div className="min-h-screen bg-black text-red-600 flex flex-col items-center justify-center p-4 font-mono">
      <h1 className="text-6xl font-extrabold mb-2 glitch" data-text="ULTIMATE BOMBER">
        ULTIMATE BOMBER
      </h1>
      <p className="text-red-400 animate-pulse mb-8">SYSTEM STATUS: ONLINE</p>

      <div className="w-full max-w-md bg-zinc-900 border-2 border-red-600 p-6 rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.3)]">
        <label className="block mb-2 text-white">TARGET NUMBER</label>
        <input 
          type="text" placeholder="Enter Number" 
          className="w-full p-3 bg-black border border-red-500 text-white mb-4 outline-none"
          value={number} onChange={(e) => setNumber(e.target.value)}
        />

        {!isUltimate ? (
          <>
            <label className="block mb-2 text-white">SMS AMOUNT (MAX 100)</label>
            <input 
              type="number" max="100" 
              className="w-full p-3 bg-black border border-red-500 text-white mb-2 outline-none"
              value={amount} onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-yellow-500 mb-4">ENTER ultimate pass for unlimited sms attempt</p>
            <input 
              type="password" placeholder="Enter Ultimate Pass" 
              className="w-full p-3 bg-black border border-blue-500 text-white mb-4 outline-none"
              value={pass} onChange={(e) => setPass(e.target.value)}
            />
            <button onClick={handleUnlock} className="w-full bg-blue-700 text-white p-2 mb-4 hover:bg-blue-600 transition">UNLOCK ULTIMATE</button>
          </>
        ) : (
          <div className="mb-4">
            <label className="block mb-2 text-green-500">ULTIMATE MODE ACTIVE</label>
            <input 
              type="text" placeholder="Enter Target Number" 
              className="w-full p-3 bg-black border border-green-500 text-white outline-none"
              value={number} onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        )}

        <button 
          onClick={startAttack}
          className="w-full bg-red-600 text-white py-4 font-bold text-xl hover:bg-red-700 transition mt-4"
        >
          ATTACK
        </button>

        <button 
          onClick={() => setStatus('STOPPED')}
          className="w-full bg-zinc-800 text-white py-2 mt-4 hover:bg-zinc-700"
        >
          STOP BOOMING
        </button>

        <div className="mt-6 text-center text-white font-bold">
          STATUS: <span className="text-red-500">{status}</span>
        </div>
      </div>

      <style jsx>{`
        .glitch {
          color: white;
          position: relative;
          text-shadow: 0.05em 0 0 #ff0000, -0.05em -0.025em 0 #00ff00, 0.025em 0.05em 0 #0000ff;
          animation: glitch 1s infinite;
        }
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 #ff0000, -0.05em -0.025em 0 #00ff00; }
          50% { text-shadow: -0.05em -0.025em 0 #ff0000, 0.025em 0.05em 0 #00ff00; }
          100% { text-shadow: 0.05em 0 0 #ff0000, -0.05em -0.025em 0 #00ff00; }
        }
      `}</style>
    </div>
  );
    }
