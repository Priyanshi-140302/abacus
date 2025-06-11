import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
const URL = import.meta.env.VITE_URL;

const ListeningPractice = () => {


    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // to store total pages


    const getData = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const response = await axios.get(`${URL}/listening-question-categories`, {
                params: { per_page: page }, // query param
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setData(response.data); // Axios auto-parses JSON
                setTotalPages(response.data.total || 1);
            } else {
                console.error('Failed to fetch:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        getData();
    }, [page])



    return (
        <>
            <div className="main-container bg-theme">
                <Header data={{ title: "", detail: "Listening Practice", description: '' }} />
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-4">

                            {data?.data?.map((val, index) => {
                                return (
                                    <>
                                        <div key={index} className="col-12 col-md-6 col-xl-4 mb-3">
                                            <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                                <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                                    <h6 className="text-000000 fw-semibold mb-0 fs-22">{val?.category_id}</h6>
                                                    <Link to={`/recent-played/${val?.category_id}`} className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}



                        </div>

                        <div className="d-flex justify-content-center my-4">
                            <button
                                className="btn btn-secondary mx-2"
                                disabled={page === 1}
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </button>
                            <span className="fs-5 align-self-center">Page {page} of {totalPages}</span>
                            <button
                                className="btn btn-secondary mx-2"
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListeningPractice