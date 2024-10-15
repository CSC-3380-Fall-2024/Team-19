import formImage from './assets/images/stormi-smile.png';

function Form() {
    return (
      <>
        <div className="form">
          <img className="form-image" src={formImage} alt="Form Image"></img>
          <h2 className="form-title">Calendar</h2>
          <p className="form-text">Fill out the form below to get started</p>
        </div>
      </>
    );
  }

  export default Form


