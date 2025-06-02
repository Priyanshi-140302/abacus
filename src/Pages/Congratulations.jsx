import React from 'react'
import congratsicon from '../assets/images/congrats-icon.png';
import { Link } from 'react-router-dom';

const Congratulations = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 col-md-6 col-xl-4 col-xxl-3 my-5 mx-auto text-center">
                            <img src={congratsicon} alt="" className="mb-4" />
                            <h2 className="fw-semibold">Congratulations! </h2>
                            <h4 className="fw-normal mb-4">You’ve successfully completed all your trial questions. Now, let's move on to the Competition Questions.</h4>
                            <Link to='/competition-questions' className="btn btn-submit w-100">
                                Continue
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Congratulations