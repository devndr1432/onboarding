import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="container">
                        <div
                            className="row justify-content-center align-items-center"
                            style={{ height: "100vh" }}
                        >
                            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
                                <div className="col-md-12 my-2">
                                    <div className="home-heading">
                                        <h1>Work presentation</h1>
                                        <p>Improve your communication skills with private, realtime, and judgement free speech coaching on your online meetings - powered by AI</p>
                                    </div>
                                    <div className="start-btn">
                                        <Link to="/login" type="button">Start</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="col-md-12 my-2">
                                    <video
                                        controls
                                        width="100%"
                                        autoPlay // Corrected here
                                        loop    // For looping the video
                                        muted // You might need this to ensure autoPlay works in most browsers
                                        height="auto"
                                        style={{ borderRadius: "15px" }}
                                        src="https://storage.googleapis.com/yoodli-public/landing-page-assets/lp-hero-video.webm"
                                    >
                                        Sorry, your browser doesn't support embedded videos.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
