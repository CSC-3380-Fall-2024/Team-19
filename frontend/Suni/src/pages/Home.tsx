//import PopOut from '../PopOut.tsx' //to get imports/files from src, use ../
import QuizPopUp from '../QuizPopUp.tsx'

import cloudBackground from '../assets/backgrounds/clouds.png';


function Home() {
    return (
      <>
        <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
          style={{
          backgroundImage: `url(${cloudBackground})`
        }}>
          <div className="relative min-h-screen w-full">
            <div className="container mx-auto p-4">
              {/* Content Start */}
              <section>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                  <div className="max-w-3xl">
                    <h2 className="text-5xl font-extrabold sm:text-4xl">
                      Tell us about your dream trip!
                    </h2>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full mt-10">
                      <QuizPopUp/>
                    </div>

                    <div className="lg:py-16">
                      <article className="space-y-4 text-gray-600">
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
                          eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae
                          eius quidem quam repellat.
                        </p>

                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum explicabo quidem
                          voluptatum voluptas illo accusantium ipsam quis, vel mollitia? Vel provident culpa
                          dignissimos possimus, perferendis consectetur odit accusantium dolorem amet voluptates
                          aliquid, ducimus tempore incidunt quas. Veritatis molestias tempora distinctio
                          voluptates sint! Itaque quasi corrupti, sequi quo odit illum impedit!
                        </p>
                      </article>
                    </div>
                  </div>
                </div>
              </section>
              {/* Content End*/}
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Home