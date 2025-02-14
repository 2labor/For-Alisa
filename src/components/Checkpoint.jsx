import React from "react"

const Checkpoint = (props) => {
  return (
    <div className="checkpoint">
      <header className="checkpoint-header">
        <div className="checkpoint-current">{currentCheckpoint} / {props.checkpoints.length}</div>
        <button className="checkpoint-back">
          <img src="/" alt="" onClick={console.log('back')}/>
        </button>
      </header>
        <h1 className="checkpoint-congrats">Поздоровляю ты дошла до {currentCheckpoint}!❤️‍🔥</h1>
      <section className="checkpoint-content">
        <img src={props.image} alt="" className="checkpoint-img" />
        <h1 className="checkpoint-title">{props.name}</h1>
        <p className="checkpoint-description">{props.description}</p>
      </section>
    </div>
  )
};

export default Checkpoint;
