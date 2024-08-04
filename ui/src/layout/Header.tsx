import { useContext, useEffect, useState } from "react";
import { GameContext } from "../GameContext";
import { Modal } from "flowbite-react";
import PlayerScoreTable from "../game/common/PlayerScoreTable";
import HeaderModal from "./HeaderModal";

export default function Header() {
  const { game } = useContext(GameContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    if (game?.state.state === "WaitingToStart") {

    }
  }, [game?.state.state])

  return (
    <>
      <div className="flex justify-between md:justify-center px-4 md:px-6 h-14 w-100 items-center bg-orange-400 border-b-2 border-black">
        <button className="font-bold text-left md:text-center text-xl grow self-stretch" onClick={() => setModalOpen(true)}>Open Trivia Night</button>
        {game
          ? <div className="md:absolute right-0 md:pr-4 z-10">
            <span>Game ID: </span>
            <span className="font-semibold italic">{game.id}</span>
          </div>
          : <div></div>}
      </div>

      <Modal show={modalOpen} dismissible onClose={() => setModalOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <HeaderModal onLeaveGame={() => setModalOpen(false)} />
        </Modal.Body>
      </Modal>
    </>
  )
}