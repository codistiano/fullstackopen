import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const searchKeyword = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={searchKeyword} />
    </div>
  );
};

export default Filter;
