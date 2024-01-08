import { controlTypes } from "../../../data/controlTypes";
import { ControlType, PlayersMarker } from "../../../types/boardTypes";

interface Props {
  marker: PlayersMarker;
  controlType: ControlType;
  setControlType: (controlType: ControlType) => void;
}

export default function PlayerSelectDropdown(props: Props) {
  return (
    <div>
      <p>Select Player {props.marker}</p>
      <select
        style={{ padding: "4px" }}
        value={props.controlType}
        onChange={(e) => props.setControlType(e.target.value as ControlType)}
      >
        {Object.entries(controlTypes).map(([key, value]) => (
          <option key={key} value={key}>
            {value.label}
          </option>
        ))}
      </select>
    </div>
  );
}
