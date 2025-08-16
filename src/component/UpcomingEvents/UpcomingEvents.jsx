import React from 'react';

const events = [
  {
    id: 1,
    title: 'Food Donation Drive – Downtown',
    date: '2025-09-05',
    location: 'Downtown Community Center',
    image: 'https://i.ibb.co.com/LdqD5KZL/donation-Pic1.webp',
    description: 'Join us to donate surplus food and help local families in need.',
  },
  {
    id: 2,
    title: 'Charity Awareness Webinar',
    date: '2025-09-12',
    location: 'Online Zoom Event',
    image: 'https://i.ibb.co.com/qLmNBfqz/donation-Pic2.webp',
    description: 'Learn how you can contribute and make an impact in your community.',
  },
  {
    id: 3,
    title: 'Restaurant Partner Meetup',
    date: '2025-09-20',
    location: 'Green Park Hotel',
    image: 'https://i.ibb.co.com/GfjXFP15/donation-Pic3.webp',
    description: 'Networking event for restaurants collaborating with our platform.',
  },
  {
    id: 4,
    title: 'Volunteer Recruitment Fair',
    date: '2025-10-01',
    location: 'City Convention Center',
    image: 'https://i.ibb.co.com/Jj1v7Ntm/donation-Pic4.webp',
    description: 'Find out how you can become a part of our dedicated volunteer team.',
  },
  {
    id: 5,
    title: 'Community Garden Harvest Day',
    date: '2025-10-15',
    location: 'Northside Community Garden',
    image: 'https://i.ibb.co.com/GfjXFP15/donation-Pic3.webp',
    description: 'Celebrate the harvest and help distribute fresh produce to those in need.',
  },
  {
    id: 6,
    title: 'Annual Fundraiser Gala',
    date: '2025-11-03',
    location: 'Grand Ballroom Hotel',
    image: 'https://i.ibb.co.com/wF20JBnm/donation-Pic6.webp',
    description: 'A night of elegance and purpose, raising funds to fight hunger.',
  },
  {
    id: 7,
    title: 'Student Food Drive',
    date: '2025-11-18',
    location: 'University Campus',
    image: 'https://i.ibb.co.com/dwSWY1Dj/donation-Pic7.webp',
    description: 'An initiative led by students to collect food donations for the holidays.',
  },
  {
    id: 8,
    title: 'Holiday Meal Preparation',
    date: '2025-12-10',
    location: 'Main Kitchen',
    image: 'https://i.ibb.co.com/Sw1VgFxC/donation-Pic8.webp',
    description: 'Help us prepare and package meals for distribution during the holiday season.',
  },
];

const UpcomingEvents = () => {

  return (
    <section className="max-w-7xl mx-auto mt-20 mb-30 px-4">
      <div className=" text-center mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold text-primary mb-3"
        >
          Upcoming Events
        </h2>
        <p
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          Stay updated with our latest events, webinars, and community meetups.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className=" rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform-gpu"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{event.title}</h3>
                <p className="text-secondary text-sm mb-4 leading-relaxed">{event.description}</p>
              </div>
              <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">📍</span>
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
