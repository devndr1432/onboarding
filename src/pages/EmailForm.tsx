import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const EmailForm = () => {
    const [state, handleSubmit] = useForm("xoqorley");
    const [showThankYou, setShowThankYou] = useState(false);

    const navigate = useNavigate();

    if (state.succeeded && !showThankYou) {
        setTimeout(() => {
            setShowThankYou(true);
            navigate("/dashboard");
        }, 2000);  // Redirects after 2 seconds
        return <p style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", margin: "auto", textAlign: "center" }}>Thanks for joining! Redirecting...</p>;
    }


    return (<>
        <section>
            <div className="container-fluid">
                <div className="container_sign">
                    <div
                        className="row justify-content-center align-items-center"
                        style={{ height: "100vh" }}
                    >
                        <div className="col-sm-12 col-md-6 col-lg-6 form-continer">
                            <div className="start-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            required

                                        />
                                        <ValidationError
                                            prefix="Email"
                                            field="email"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Message" className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            id="Message"
                                            name="Message"
                                            className="form-control"
                                            placeholder="Subject"
                                            required

                                        />
                                        <ValidationError
                                            prefix="Message"
                                            field="message"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            type="submit"
                                            disabled={state.submitting}
                                            className="btn btn-primary mb-3">Confirm identity</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 right_section">
                            <div className="form-right-img">
                                <img src="https://storage.googleapis.com/yoodli-public/onboarding-assets/presentation1.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

//export default EmailForm;

