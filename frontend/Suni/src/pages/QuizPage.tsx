//import PopOut from '../PopOut.tsx'
import Quiz from '../Quiz.tsx'

import cloudBackground from '../assets/backgrounds/clouds.png'; //Cloud Background


function QuizPage() {
    return (
      <>
        <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
          style={{
          backgroundImage: `url(${cloudBackground})`
        }}>
          <div className="relative min-h-screen w-full">
            <div className="container mx-auto p-4">
              {/* Content Start */}
                <Quiz/>
              {/* Content End*/}
            </div>
          </div>
        </div>
      </>
    );
  }

  export default QuizPage