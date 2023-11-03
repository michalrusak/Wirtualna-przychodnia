import { ChangeEvent, useEffect, useState } from "react";
import databaseService from "../../services/database-service";
import { DoctorsArray } from "../../models/doctor.model";
import "./DoctorForm.scss";

const DoctorForm = (props: any) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctors, setDoctors] = useState<DoctorsArray>([]);

  useEffect(() => {
    getDoctors();

    if (selectedDoctor) {
      props.setDoctor(selectedDoctor);
    }
  }, [selectedDoctor]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(event.target.value);
  };

  const getDoctors = async () => {
    try {
      const doctors = await databaseService.getdoctors();
      setDoctors(doctors);
    } catch (error) {
      alert("Wystąpił błąd. Spróbuj ponownie później.");
    }
  };

  const options = doctors.map((elem) => (
    <option className="doctor-form__option" key={elem.uid} value={elem.uid}>
      {`${elem.name} 
      ${elem.specialisation}`}
    </option>
  ));

  return (
    <div className="doctor-form">
      <select
        className="doctor-form__select"
        value={selectedDoctor}
        onChange={handleSelectChange}
      >
        <option className="doctor-form__option" value="" disabled hidden>
          Wybierz lekarza
        </option>
        {doctors ? options : null}
      </select>
    </div>
  );
};

export default DoctorForm;
