import { ChangeEvent, useEffect, useState } from "react";
import databaseService from "../../services/database-service";
import { DoctorsArray } from "../../models/doctor.model";
import "./DoctorForm.scss";

const DoctorForm = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [doctors, setDoctors] = useState<DoctorsArray>([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    setSelectedValue(event.target.value);
  };

  const getDoctors = async () => {
    try {
      const doctors = await databaseService.getdoctors();
      setDoctors(doctors);
    } catch (error) {
      console.error(error);
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
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option className="doctor-form__option" value="" disabled hidden>
          Wybierz lekarza
        </option>
        {options}
      </select>
    </div>
  );
};

export default DoctorForm;
