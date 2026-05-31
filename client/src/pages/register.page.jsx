import React from 'react'

const register = () => {
    return (
        <div className="min-h-screen bg-[#F8F4EE]">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="min-h-screen flex items-center justify-center">

                    <div className="w-full max-w-2xl">

                        <div className="text-center mb-16">
                            <span className="text-sm tracking-[0.25em] uppercase text-stone-500 font-bold">
                                Aradhana
                            </span>

                            <h1 className="mt-6 text-5xl md:text-6xl font-light text-stone-900 leading-tight">
                                Discover Your
                                <br />
                                Cosmic <span className="text-orange-500">Blueprint</span>
                            </h1>

                            <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-xl mx-auto">
                                Enter your birth details to receive personalized
                                astrological insights crafted around your unique
                                celestial journey.
                            </p>
                        </div>

                        <form className="space-y-10">
                            <div>
                                <label className="block text-sm text-stone-500 mb-3">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Himanshu Singh"
                                    className="
                    w-full
                    bg-transparent
                    border-b
                    border-stone-300
                    pb-4
                    text-lg
                    focus:outline-none
                    focus:border-stone-900
                  "
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-sm text-stone-500 mb-3">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        className="
                      w-full
                      bg-transparent
                      border-b
                      border-stone-300
                      pb-4
                      focus:outline-none
                      focus:border-stone-900
                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-stone-500 mb-3">
                                        Time of Birth
                                    </label>

                                    <input
                                        type="time"
                                        className="
                      w-full
                      bg-transparent
                      border-b
                      border-stone-300
                      pb-4
                      focus:outline-none
                      focus:border-stone-900
                    "
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-stone-500 mb-3">
                                    Place of Birth
                                </label>

                                <input
                                    type="text"
                                    placeholder="Delhi, India"
                                    className="
                    w-full
                    bg-transparent
                    border-b
                    border-stone-300
                    pb-4
                    text-lg
                    focus:outline-none
                    focus:border-stone-900
                  "
                                />
                            </div>

                            <button
                                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  text-stone-900
                  text-lg
                  font-medium
                  group
                "
                            >
                                Continue

                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default register