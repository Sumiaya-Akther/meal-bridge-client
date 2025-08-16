import React from 'react';
import Banner from '../../component/Banner/Banner';
import FeaturedDonations from '../../component/FeaturedDonations/FeaturedDonations';
import LatestCharityRequests from '../../component/LatestCharityRequests/LatestCharityRequests';
import CommunityStories from '../../component/CommunityStories/CommunityStories';
import ImpactStats from '../../component/ImpactStats/ImpactStats';
import HowItWork from '../../component/HowItWork/HowItWork';
import BecomeCharity from '../../component/BecomeCharity/BecomeCharity';
import UpcomingEvents from '../../component/UpcomingEvents/UpcomingEvents';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <LatestCharityRequests></LatestCharityRequests>
            <ImpactStats></ImpactStats>
            <CommunityStories></CommunityStories>
            <HowItWork></HowItWork>
            <BecomeCharity></BecomeCharity>
            <UpcomingEvents></UpcomingEvents>
        </div>
    );
};

export default Home;