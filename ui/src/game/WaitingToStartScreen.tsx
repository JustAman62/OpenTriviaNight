import { useContext } from "react";
import { GameContext } from "../GameContext";
import { Button, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import useApiClient from "../useApiClient";
import GameIdCopyButton from "./common/GameIdCopyButton";
import QRCode from "react-qr-code";

export default function WaitingToStartScreen() {
  const { game, username, prefs } = useContext(GameContext);
  const apiClient = useApiClient();

  if (!game) {
    return <></>;
  }

  const isHost =
    game.players.find((x) => x.username === username)?.role === "Host";

  return (
    <div className="flex flex-col max-w-(--breakpoint-md) mx-auto mb-8 items-stretch">
      <div className="text-center my-4">
        <Spinner />
      </div>
      <h1 className="text-lg font-semibold self-center mb-5">
        Waiting for Host to Start Game
      </h1>

      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeadCell>Players</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {game.players.map((player) => (
            <TableRow key={player.username}>
              <TableCell className="flex justify-between items-center py-2 px-6">
                <div className="flex flex-col">
                  <div className="text-lg">{player.username}</div>
                  <div className="text-sm text-gray-400">{player.role}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell>
              <div className="inline-flex items-middle">
                <span className="py-2 pr-1">Use Game ID </span>
                <GameIdCopyButton className="text-gray-500 hover:bg-gray-100 active:bg-gray-200" />
                <span className="py-2 pl-1">to join</span>
              </div>
              <div>
                {!prefs.hideGameId ? (
                  <QRCode
                    style={{ height: "auto", maxWidth: "100%" }}
                    value={window.location.href + "?gameId=" + game.id}
                  />
                ) : (
                  <></>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {isHost ? (
        <Button
          className="mt-4"
          color="success"
          size="lg"
          onClick={apiClient.startGame}
        >
          Start Game
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
