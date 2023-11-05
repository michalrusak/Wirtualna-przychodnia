import { useEffect, useState } from "react";
import Appointment from "../appointment/Appointment";
import "./AppointmentsList.scss";

const AppointmentsList = (props: any) => {
  const renderList = props.list.map((elem: any) => (
    <Appointment
      key={elem.date}
      date={elem.date}
      name={elem.name}
      isAvailable={elem.isAvailable ? elem.isAvailable : null}
      //
    />
  ));

  return (
    <div className="appointments-list">
      <div className="appointments-list__list-header">
        <div>Data</div>
        <div>Godzina</div>
        <div>Osoba</div>
      </div>
      <div className="appointments-list__list-container">
        {props.list.length === 0 ? "Brak wizyt" : renderList}
      </div>
    </div>
  );
};

export default AppointmentsList;
