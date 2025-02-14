import React from "react"

const FullScreen = (props) => {
  return (
    <div className="screen">
      <header className="screen-header">
        <h1 className="screen-title">{props.name}</h1>
        <button className="screen-close">
          <img src="/" alt="" onClick={console.log('click')}/>
        </button>
      </header>
      <section className="screen-main">
        <img src={props.imageUrl} alt="" className="screen-img" />
        <div className="screen-text">
          <h2 className="screen-name">{props.name}</h2>
          <p className="screen-info">{props.description}</p>
        </div>
      </section>
    </div>
  )
};

export default FullScreen;
