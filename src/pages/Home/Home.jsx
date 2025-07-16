import React from 'react';
import Banner from '../../component/Banner/Banner';
import FeaturedDonations from '../../component/FeaturedDonations/FeaturedDonations';
import LatestCharityRequests from '../../component/LatestCharityRequests/LatestCharityRequests';
import CommunityStories from '../../component/CommunityStories/CommunityStories';
import ImpactStats from '../../component/ImpactStats/ImpactStats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <LatestCharityRequests></LatestCharityRequests>
            <ImpactStats></ImpactStats>
            <CommunityStories></CommunityStories>
        </div>
    );
};

export default Home;