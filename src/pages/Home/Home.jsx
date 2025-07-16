import React from 'react';
import Banner from '../../component/Banner/Banner';
import FeaturedDonations from '../../component/FeaturedDonations/FeaturedDonations';
import LatestCharityRequests from '../../component/LatestCharityRequests/LatestCharityRequests';
import CommunityStories from '../../component/CommunityStories/CommunityStories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <LatestCharityRequests></LatestCharityRequests>
            <CommunityStories></CommunityStories>
        </div>
    );
};

export default Home;