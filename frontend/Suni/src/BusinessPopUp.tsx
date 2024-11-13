function BusinessPopUp() {
    return (
      <>
        <div className=" ml-4 max-w-md mx-auto bg-blue-100/80 rounded-3xl shadow-md overflow-hidden md:max-w-2xl ju=">
              {/*image location*/}
              <div className="quiz-pop-up-title text-4xl my-10 flex justify-center font-extrabold">
                Apply your Business!
              </div>
              <div className="flex justify-center font-bold">Let Suni know your Preferences, and he'll plan your trip for you!</div>
            <div className="p-10 text-center space-x-7">
              <button className="bg-[#a5c3dd] text-white px-4 py-2 rounded-full border-0 cursor-pointer">
                    <a href="/">Surprise Me</a> {/* Each of these will lead to a variation / section of the quiz*/}
                </button>
                <button className="bg-[#a5c3dd] text-white px-4 py-2 rounded-full border-0 cursor-pointer">
                    <a href="/">Help me Decide</a>
                </button>
                <button className="bg-[#a5c3dd] text-white px-4 py-2 rounded-full border-0 cursor-pointer">
                    <a href="/">Let me Choose</a>
                </button>


            </div>
        </div>

    </>
    );
  }

  export default BusinessPopUp