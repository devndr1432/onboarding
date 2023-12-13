import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();

    return (<>
        <section className="center-content" style={{ background: "linear-gradient(90deg, rgb(29, 169, 230) 0%, rgb(105, 102, 254) 82%)" }}>
            <div className="container-fluid">
                <div className="container ">
                    <div className="s-dashboard">
                        <h1 className="text-center text-white mb-5 justify-content-center">What kind of interview would you like to practice?</h1>
                        <div className="d-flex flex-wrap card-gap flex-col-3 justify-content-center">

                            <button
                                type="button"
                                className="small-card my-2"
                                onClick={() => navigate("/recordpractice")}
                            >
                                <p className="text-center">General 1</p>
                            </button>


                            <button
                                type="button"
                                className="small-card my-2"
                                onClick={() => navigate("/recordpractice")}
                            >
                                <p className="text-center">General 2</p>
                            </button>


                            <button
                                type="button"
                                className="small-card my-2"
                                onClick={() => navigate("/recordpractice")}
                            >
                                <p className="text-center">General 3</p>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}