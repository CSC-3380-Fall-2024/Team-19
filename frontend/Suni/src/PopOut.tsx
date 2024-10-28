import popOutImage from './assets/images/stormi-smile.png';

function PopOut() {
    return (
      <>
        <div className="pop-out">
          <img className="pop-out-image" src={popOutImage} alt="Pop Out Image"></img>
          <h2 className="pop-out-title">Calendar</h2>
          <p className="pop-out-text">Fill out the form below to get started</p>
        </div>
      </>
    );
  }

  export default PopOut