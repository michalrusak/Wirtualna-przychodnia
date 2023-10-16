import { ChangeEvent, useEffect, useState } from "react";
import "./CalendarForm.scss";

const CalendarForm = (props: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date(NaN));
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();

  const handleSetDate = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.checked) {
      setSelectedDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      );
    } else {
      setSelectedDate(new Date(NaN));
    }
  };

  useEffect(() => {
    if (selectedDate.getDate()) props.setAppointmentDate(selectedDate);
  }, [selectedDate]);

  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const daysOfWeek = ["pon", "wt", "sr", "czw", "pt", "so", "nd"];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    let firstDayofMonth =
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDay() + 1, // getting first day of month
      lastDateofMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate(), // getting last date of month, liczba dni w mc
      lastDayofMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        lastDateofMonth
      ).getDay(), // getting last day of month, dzien tyg ostatn
      lastDateofLastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate(); // getting last date of previous month, liczba dni poprzedniego mc
    const days = [];

    for (let i = firstDayofMonth - 1; i > 0; i--) {
      // creating li of previous month last days

      days.push(
        <label
          htmlFor={`prev${i}`}
          key={`prev${i}`}
          className="calendar__day calendar__day--prev"
        >
          {lastDateofLastMonth - i + 1}
          <input
            disabled
            hidden
            type="checkbox"
            id={`prev${i}`}
            name={`prev${i}`}
          />
        </label>
      );
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      // creating li of all days of current month
      // adding active class to li if the current day, month, and year matched

      const disabled = () => {
        if (today.getFullYear() > currentDate.getFullYear()) {
          return true;
        } else {
          if (
            currentDate.getMonth() < today.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
          ) {
            return true;
          } else {
            if (
              currentDate.getMonth() === today.getMonth() &&
              i < today.getDate()
            ) {
              return true;
            } else return false;
          }
        }
      };

      days.push(
        <label
          htmlFor={`current${i}`}
          key={`current${i}`}
          className={`calendar__day calendar__day--current 
          ${
            today.getDate() === i &&
            selectedDate.getDate() !== today.getDate() &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
              ? "calendar__day--today"
              : ""
          } 
          ${
            selectedDate.getDate() === i &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear()
              ? "calendar__day--active"
              : ""
          } 
          ${disabled() ? "calendar__day--disabled" : ""}
          `}
        >
          {i}
          <input
            disabled={disabled()}
            hidden
            type="checkbox"
            id={`current${i}`}
            name={`current${i}`}
            onChange={(e) => handleSetDate(e, i)}
            checked={selectedDate.getDate() === i ? true : false}
          />
        </label>
      );
    }

    for (let i = lastDayofMonth; i <= 6; i++) {
      // creating li of next month first days

      days.push(
        <label
          htmlFor={`next${i}`}
          key={`next${i}`}
          className="calendar__day calendar__day--next"
        >
          {i - lastDayofMonth + 1}
          <input
            disabled
            hidden
            type="checkbox"
            id={`next${i}`}
            name={`next${i}`}
          />
        </label>
      );
    }

    return days;
  };

  const renderDaysOfWeek = daysOfWeek.map((elem) => (
    <div className="calendar__dayOfWeek" key={elem}>
      {elem}
    </div>
  ));

  return (
    <div className="calendar">
      <div className="calendar__current-date">
        {/* {!selectedDate.getDate()
          ? "Nie wybrano daty"
          : `${selectedDate.getDate()} ${
              months[selectedDate.getMonth()]
            } ${selectedDate.getFullYear()}`} */}
        {`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
      </div>

      <div className="calendar__buttons">
        <button className="calendar__button" onClick={prevMonth}>
          &#8678;
        </button>
        <button className="calendar__button" onClick={nextMonth}>
          &#8680;
        </button>
      </div>
      <div className="calendar__daysOfWeek">{renderDaysOfWeek}</div>
      <form className="calendar__grid">{renderCalendar()}</form>
    </div>
  );
};

export default CalendarForm;
