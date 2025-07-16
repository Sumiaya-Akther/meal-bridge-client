import React from 'react';
import Banner from '../../component/Banner/Banner';
import FeaturedDonations from '../../component/FeaturedDonations/FeaturedDonations';
import LatestCharityRequests from '../../component/LatestCharityRequests/LatestCharityRequests';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <LatestCharityRequests></LatestCharityRequests>
        </div>
    );
};

export default Home;