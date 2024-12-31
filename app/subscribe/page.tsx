"use client"

import { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Toaster, toast } from 'sonner';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });

    if (response.ok) {
      toast.success('Subscription successful!');
      setEmail('');
      setName('');
    } else {
      toast.error('Failed to subscribe.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-start space-y-4">
          <a href='/subscribers'><IoIosArrowRoundBack /></a>
          <h1 className='text-lg'>Subscribe to Our Newsletter : </h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 text-sm rounded-lg bg-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 text-sm rounded-lg bg-transparent"
          />
          <button type="submit" className="bg-white hover:scale-105 text-black p-2 rounded-full py-2 px-4 transition-transform ease-in-out">
            Subscribe
          </button>
        </form> 
        <Toaster />
    </div>
  );
};

export default Subscribe;
