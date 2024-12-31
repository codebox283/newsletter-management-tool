"use client";

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface Subscriber {
  id: number;
  email: string;
  name: string;
}

const SkeletonLoader = () => (
  <div className="flex justify-between items-center animate-pulse">
    <div className="h-4 bg-gray-800 rounded w-2/3"></div>
    <div>
      <button
        className="bg-yellow-500 rounded-full text-white px-4 py-1 mr-2 hover:scale-110 transition-all ease-in-out"
      >
        Edit
      </button>
      <button
        className="bg-red-500 rounded-full text-white px-4 py-1 hover:scale-110 transition-all ease-in-out"
      >
        Delete
      </button>
    </div>
  </div>
);

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [editingSubscriberId, setEditingSubscriberId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      const response = await fetch('/api/subscribers');
      if (!response.ok) {
        toast.error('Failed to fetch subscribers.');
        setLoading(false); 
        return;
      }
      const data: Subscriber[] = await response.json();
      setSubscribers(data);
      setLoading(false);
    };

    fetchSubscribers();
  }, []);

  const handleEditClick = (subscriber: Subscriber) => {
    setEditingSubscriberId(subscriber.id);
    setEmail(subscriber.email);
    setName(subscriber.name);
  };

  const handleUpdate = async () => {
    if (editingSubscriberId === null) return;

    const response = await fetch('/api/subscribers', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editingSubscriberId, email, name }),
    });

    if (response.ok) {
      const updatedSubscriber: Subscriber = await response.json();
      setSubscribers((prev) =>
        prev.map((sub) =>
          sub.id === updatedSubscriber.id ? updatedSubscriber : sub
        )
      );
      toast.success("Subscriber details updated successfully!");
      resetForm();
    } else {
      toast.error('Failed to update subscriber.');
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch('/api/subscribers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      toast.success("Subscriber Removed Successfully");
      setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
    } else {
      toast.error('Failed to delete subscriber.');
    }
  };

  const resetForm = () => {
    setEditingSubscriberId(null);
    setEmail('');
    setName('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className='w-1/2'>
        <span className='flex justify-between'>
        <a href='/subscribe' className='text-lg'>+</a>
        <h2 className="text-xl mb-4">subscriber count : {subscribers.length}</h2>
        </span>
        <ul className='space-y-2'>
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            subscribers.map((subscriber) => (
              <div key={subscriber.id}>
                <li className="flex justify-between items-center">
                  <span>{subscriber.name} - {subscriber.email}</span>
                  <div>
                    <button
                      onClick={() => handleEditClick(subscriber)}
                      className="bg-yellow-500 rounded-full text-white px-4 py-1 mr-2 hover:scale-110 transition-all ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subscriber.id)}
                      className="bg-red-500 rounded-full text-white px-4 py-1 hover:scale-110 transition-all ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </li>

                {editingSubscriberId === subscriber.id && (
                  <div className="mt-2">
                    <h2 className="text-lg">Edit</h2>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border bg-transparent rounded-lg text-sm p-2 mr-2"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border bg-transparent rounded-lg text-sm p-2 mr-2"
                    />
                    <button onClick={handleUpdate} className="bg-white text-black px-4 py-1 rounded-full hover:scale-110 transition-all ease-in-out">
                      Update
                    </button>
                    <button onClick={resetForm} className="bg-transparent text-white p-2 ml-2 hover:scale-125 transition-all ease-in-out">
                      ❌
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </ul>
        
        <Toaster />
      </div>
    </div>
  );
};

export default Subscribers;
