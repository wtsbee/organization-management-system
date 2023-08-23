import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
registerLocale("ja", ja);

type Props = {
  value: {
    date: Date | null | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | null | undefined>>;
  };
};

const DatePickerCustom = ({ value }: Props) => {
  const { date, setDate } = value;

  return (
    <DatePicker
      className="input input-bordered"
      placeholderText="日付を選択してください"
      dateFormat="yyyy/MM/dd"
      locale="ja"
      selected={date}
      onChange={(inputDate) => setDate(inputDate)}
    />
  );
};

export default DatePickerCustom;
