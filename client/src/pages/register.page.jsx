import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../service/api.service';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        birthTime: "",
        birthPlace: ""
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        try {
            const res = await api.post("/user", formData);
            if (res.status === 201) {
                localStorage.setItem("astroUserId", res.data.userId);
                localStorage.setItem("astroUserName", res.data.username);
                navigate("/");
            }
        } catch (error) {
            console.log("Error from register", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6 py-16 relative overflow-hidden">

            {/* Grain overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.025] z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px",
                }}
            />

            {/* Soft ambient glow */}
            <div className="fixed top-[-120px] right-[-100px] w-[420px] h-[420px] rounded-full bg-orange-100 opacity-40 blur-[100px] pointer-events-none" />
            <div className="fixed bottom-[-100px] left-[-80px] w-[320px] h-[320px] rounded-full bg-stone-200 opacity-50 blur-[80px] pointer-events-none" />

            <div className="w-full max-w-xl relative z-20">

                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 font-semibold mb-5">
                        Aradhana
                    </p>

                    <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-7">
                        <span className="text-lg">✦</span>
                    </div>

                    <h1
                        className="text-[42px] md:text-[52px] text-stone-900 leading-[1.1] font-light"
                        style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
                    >
                        Discover Your
                        <br />
                        Cosmic{" "}
                        <span className="text-orange-500 italic">Blueprint</span>
                    </h1>

                    <p className="mt-5 text-[14.5px] text-stone-500 leading-relaxed max-w-sm mx-auto">
                        Enter your birth details to receive personalized
                        astrological insights crafted around your unique
                        celestial journey.
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-8">

                    {/* Name */}
                    <div className="group">
                        <label className="block text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-3 font-medium">
                            Full Name
                        </label>
                        <input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            type="text"
                            placeholder="Himanshu Singh"
                            className="w-full bg-transparent border-b border-stone-300 pb-3.5 text-[16px] text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors duration-200"
                        />
                    </div>

                    {/* Date + Time */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-3 font-medium">
                                Date of Birth
                            </label>
                            <input
                                value={formData.birthDate}
                                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                type="date"
                                className="w-full bg-transparent border-b border-stone-300 pb-3.5 text-[15px] text-stone-700 focus:outline-none focus:border-stone-700 transition-colors duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-3 font-medium">
                                Time of Birth
                            </label>
                            <input
                                value={formData.birthTime}
                                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                                type="time"
                                className="w-full bg-transparent border-b border-stone-300 pb-3.5 text-[15px] text-stone-700 focus:outline-none focus:border-stone-700 transition-colors duration-200"
                            />
                        </div>
                    </div>

                    {/* Place */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-3 font-medium">
                            Place of Birth
                        </label>
                        <input
                            value={formData.birthPlace}
                            onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                            type="text"
                            placeholder="Delhi, India"
                            className="w-full bg-transparent border-b border-stone-300 pb-3.5 text-[16px] text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors duration-200"
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-6 flex items-center justify-between">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="group inline-flex items-center gap-3 text-stone-900 text-[15px] font-medium hover:text-orange-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <span className="text-stone-400">Reading the stars</span>
                                    <div className="flex gap-1">
                                        <span className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    Continue
                                    <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                                        →
                                    </span>
                                </>
                            )}
                        </button>

                        <p className="text-[11px] text-stone-400 tracking-wide">
                            Your data stays private
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register