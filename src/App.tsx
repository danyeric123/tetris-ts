import Modal from 'react-modal';
import React, { useState } from 'react'
import './App.css'
import Tetris from 'react-tetris'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function App() {

  const [modalIsOpen,setIsOpen] = useState(true);
  
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal(){
    setIsOpen(false);
  }

  return (
    <>
    <h1>Tetris</h1>
    <Tetris
      keyboardControls={{
        // Default values shown here. These will be used if no
        // `keyboardControls` prop is provided.
        down: 'MOVE_DOWN',
        left: 'MOVE_LEFT',
        right: 'MOVE_RIGHT',
        space: 'HARD_DROP',
        z: 'FLIP_COUNTERCLOCKWISE',
        x: 'FLIP_CLOCKWISE',
        up: 'FLIP_CLOCKWISE',
        p: 'TOGGLE_PAUSE',
        c: 'HOLD',
        shift: 'HOLD'
      }}
    >
      {({
        Gameboard,
        points,
        linesCleared,
        state,
        controller
      }) => (
        <div>
          <div>
            <p>Points: {points}</p>
            <p>Lines Cleared: {linesCleared}</p>
            <button onClick={controller.restart}>New game</button>
          </div>
          <Gameboard />
          {/* <PieceQueue /> */}
          {/* {state === 'LOST' && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Game Over Modal"
            >
              <h2>Game Over</h2>
              <button onClick={()=>{
                controller.restart()
                closeModal()
                }}>New game</button>
              <button onClick={closeModal}>Close</button>
            </Modal>
          )} */}
        </div>
      )}
    </Tetris>
    </>
  )
}

export default App
