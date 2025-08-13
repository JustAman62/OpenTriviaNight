import { useContext } from "react";
import { GameContext } from "../../GameContext";
import { Checkbox, Label } from "flowbite-react";

export default function ManagePreferences() {
  const { prefs, setPrefs } = useContext(GameContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefs((p) => {
      console.log(e);
      return { ...p, [e.target.name]: e.target.checked ?? e.target.value };
    });
  };

  return (
    <form className="flex flex-col">
      <div className="flex items-center">
        <Checkbox id="hideGameId" name="hideGameId" checked={prefs.hideGameId} onChange={handleInputChange} />
        <Label className="ml-4 grow" htmlFor="hideGameId" value="Hide Game ID and QR code?" />
      </div>
    </form>
  );
}
