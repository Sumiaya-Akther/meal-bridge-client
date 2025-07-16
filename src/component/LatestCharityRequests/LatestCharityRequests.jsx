import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';


const LatestCharityRequests = () => {

    const axiosInstance = useAxios();
    const { data: requests = [], isLoading, isError } = useQuery({
        queryKey: ['requestedCharity'],
        queryFn: async () => {
            const res = await axiosInstance.get('/latest/charity-requests');
            return res.data;
        },
    })

    if (isLoading) return <Loading></Loading>;

    if (isError) return <p className="text-center text-error">Failed to load requests.</p>;

    return (
        <div className="my-20 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
                Latest Charity Requests
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {requests.map((req, idx) => (
                    <div
                        key={idx}
                        className="bg-base-100 border border-gray-200 rounded-2xl shadow hover:shadow-lg p-5 flex flex-col"
                    >

                        <h4 className='text-primary font-semibold mt-auto'>Charity name: <span className="text-info text-sm">{req.organizationName}</span></h4>
                        <p className="text-sm mb-2 line-clamp-3">
                            📝 {req.mission}
                        </p>
                        <p className="text-sm text-primary font-semibold mt-auto">
                            🍱 Request for: <span className="text-info">{new Date(req.requestDate).toLocaleString('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                            })}</span>
                        </p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestCharityRequests;
