import { ChangeEvent, useEffect, useState } from "react";
import "./HourForm.scss";

const HourForm = (props: any) => {
  const [selectedHour, setSelectedHour] = useState("");

  const handleSetHours = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedHour(e.target.name);
    } else {
      setSelectedHour("");
    }
  };

  useEffect(() => {
    if (selectedHour) props.setHour(selectedHour);
  }, [selectedHour]);

  const renderHours = props.hoursArray.map((elem: string) => (
    <label
      htmlFor={elem}
      key={elem}
      className={`hour-form__hour ${
        elem === selectedHour ? "hour-form__hour--active" : ""
      }`}
    >
      {elem}
      <input
        // disabled
        hidden
        type="checkbox"
        id={elem}
        name={elem}
        onChange={(e) => handleSetHours(e)}
        checked={selectedHour === elem ? true : false}
      />
    </label>
  ));

  return (
    <div className="hour-form">
      <h2 className="hour-form__title">Wybierz godzinę:</h2>
      <form className="hour-form__hours">{renderHours}</form>
      <div className="hour-form__error">
        {props.hoursArray.length === 0 ? "Brak dostępnych terminów" : null}
      </div>
    </div>
  );
};

export default HourForm;
