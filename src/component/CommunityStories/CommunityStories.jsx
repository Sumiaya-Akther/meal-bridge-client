// 📁 src/pages/Home/CommunityStories.jsx
import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const CommunityStories = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const stories = [
    {
      name: 'Mizanur Rahman',
      role: 'Charity Organizer',
      story: 'Thanks to this platform, we’ve been able to serve over 1,000 meals a month to people in need. It’s made a huge difference!',
      image: 'https://i.ibb.co/7x9SCp4y/admin.png'
    },
    {
      name: 'Tasty Bites Restaurant',
      role: 'Restaurant Partner',
      story: 'We used to throw away a lot of good food. Now we donate it, and it feels great knowing it’s going to hungry families.',
      image: 'https://i.ibb.co/217yfXkm/food4.png'
    },
    {
      name: 'Nahida Rahman',
      role: 'Charity Organizer',
      story: 'Thanks to this platform, we’ve been able to serve over 1,000 meals a month to people in need. It’s made a huge difference!',
      image: 'https://i.ibb.co/Rtp9m6H/user1.png'
    },
    {
      name: 'Sun Flower Restaurant',
      role: 'Restaurant Partner',
      story: 'We used to throw away a lot of good food. Now we donate it, and it feels great knowing it’s going to hungry families.',
      image: 'https://i.ibb.co/Tq1rhStV/food2.png'
    }
  ];

  return (
    <div className="mt-20 mb-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-3">
        💬 Community Stories
      </h2>
      <p className='text-center mb-12 text-gray-600 dark:text-gray-300'>
        Real voices, real impact — heartfelt stories from restaurants and charities in action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-base-100 dark:bg-gray-800 border border-gray-200 shadow-lg rounded-2xl p-6 flex gap-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary dark:border-white shadow-md"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-xl font-bold text-secondary dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{item.role}</p>
              <p className="text-sm dark:text-gray-200">“{item.story}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;
