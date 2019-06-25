import { useState } from "react";

export default function useToggle(initialState) {
  const [toggleValue, setToggle] = useState(initialState);
  function toggler() {
    setToggle(!toggleValue);
  }
  return [toggleValue, toggler];
}
