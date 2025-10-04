import React, { useState } from 'react';

const mockThreads = [
  { id: 'TH-1', with: 'Ravi Kumar (Patient)', last: 'Thanks doctor!', unread: 1 },
  { id: 'TH-2', with: 'City Pharmacy', last: 'Metformin out of stock', unread: 0 },
];

const mockMessages = {
  'TH-1': [
    { from: 'patient', text: 'Doctor, is Dolo 650 ok for fever?', time: '10:10 AM' },
    { from: 'doctor', text: 'Yes, take after food.', time: '10:12 AM' },
    { from: 'patient', text: 'Thanks doctor!', time: '10:14 AM' },
  ],
  'TH-2': [
    { from: 'pharmacy', text: 'Metformin 500mg currently out of stock.', time: '9:20 AM' },
    { from: 'doctor', text: 'Use Glimepiride as alternative.', time: '9:25 AM' },
  ],
};

const Messages = () => {
  const [active, setActive] = useState('TH-1');
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    mockMessages[active].push({ from: 'doctor', text: input.trim(), time: 'Now' });
    setInput('');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <p className="text-gray-600">Chat with patients and pharmacies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-0">
          <div className="px-5 py-3 border-b bg-gray-50 rounded-t-xl text-sm font-medium">Conversations</div>
          <div className="divide-y">
            {mockThreads.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)} className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${active === t.id ? 'bg-gray-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{t.with}</div>
                  {t.unread ? <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{t.unread}</span> : null}
                </div>
                <div className="text-sm text-gray-600 mt-0.5 truncate">{t.last}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card p-0 flex flex-col h-[60vh]">
          <div className="px-5 py-3 border-b bg-gray-50 rounded-t-xl text-sm font-medium">{mockThreads.find(t => t.id === active)?.with}</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {mockMessages[active].map((m, idx) => (
              <div key={idx} className={`max-w-[70%] p-3 rounded ${m.from === 'doctor' ? 'ml-auto bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="text-sm">{m.text}</div>
                <div className="text-[10px] opacity-75 mt-1">{m.time}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <input className="input flex-1" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? send() : null} />
            <button className="btn btn-primary" onClick={send}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;


