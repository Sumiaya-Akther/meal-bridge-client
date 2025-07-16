import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from 'react-simple-typewriter';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';  // react-router-dom use korte hobe normally

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={4000}
      showThumbs={false}
      showStatus={false}
      stopOnHover={true}
    >
      {/* Slide 1 */}
      <div className="relative lg:w-7xl lg:mx-auto">
        <img
          className="w-full h-[570px] object-cover rounded-2xl"
          src="https://i.ibb.co/RTYJ71sT/banner-4.jpg"
          alt="Reduce Food Waste"
        />
        <div className="absolute bottom-20 md:bottom-40 left-1/2 transform -translate-x-1/2 text-center text-black px-4 space-y-4 bg-opacity-40 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold">
            Reduce Food Waste, Save Our Planet
            <br />
            <span className="text-primary">
              <Typewriter
                words={[
                  'Donate Excess Food',
                  'Share Leftovers',
                  'Support Local Farmers',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </span>
          </h1>
          <p className="font-medium max-w-xl mx-auto">
            Together we can reduce food waste and help those in need.
          </p>
          <Link to="/">
            <button className="btn bg-green-600 cursor-pointer text-white rounded-2xl px-6 py-2 hover:bg-green-700 transition">
              Donate Now
            </button>
          </Link>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative">
        <img
          className="w-full h-[570px] object-cover rounded-2xl"
          src="https://i.ibb.co/NdfJBtfL/banner1.jpg"
          alt="Community Sharing"
        />
        <div className="absolute bottom-20 md:bottom-40 left-1/2 transform -translate-x-1/2 text-center text-black px-4 space-y-4 bg-opacity-40 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold">
            Join Our Community to Fight Food Waste
            <br />
            <span className="text-primary">
              <Typewriter
                words={[
                  'Share Recipes',
                  'Learn Tips',
                  'Grow Awareness',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </span>
          </h1>
          <p className="font-medium max-w-xl mx-auto">
            Together, sharing knowledge can change habits and save food.
          </p>
          <Link to="/">
            <button className="btn bg-green-600 cursor-pointer text-white rounded-2xl px-6 py-2 hover:bg-green-700 transition">
              Join Community
            </button>
          </Link>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative">
        <img
          className="w-full h-[570px] object-cover rounded-2xl"
          src="https://i.ibb.co/ksVKT7sL/banner2.jpg"
          alt="Save Food, Save Future"
        />
        <div className="absolute bottom-20 md:bottom-40 left-1/2 transform -translate-x-1/2 text-center text-black px-4 space-y-4 bg-opacity-40 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold">
            Save Food, Save Future
            <br />
            <span className="text-green-400">
              <Typewriter
                words={[
                  'Be Conscious',
                  'Reduce Waste',
                  'Make Impact',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </span>
          </h1>
          <p className="font-medium max-w-xl mx-auto">
            Every small effort counts in building a sustainable future.
          </p>
          <Link to="/">
            <button className="btn bg-green-600 cursor-pointer text-white rounded-2xl px-6 py-2 hover:bg-green-700 transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
