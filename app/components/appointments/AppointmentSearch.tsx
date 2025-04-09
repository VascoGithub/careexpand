import { fetchAllAppointmentsAsync, fetchAllAppointmentsMatchingNameAsync } from "@/lib/features/appointments/appointmentsSlice";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { Input } from "@/components/ui/input";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      dispatch(fetchAllAppointmentsMatchingNameAsync({name: value}));
    } else {
        dispatch(fetchAllAppointmentsAsync())
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search appointments..."
        value={searchTerm}
        onChange={handleSearch}
        className="min-w-[100px] sm:min-w-[200px] w-full"
      />
    </div>
  );
};

export default SearchBar;