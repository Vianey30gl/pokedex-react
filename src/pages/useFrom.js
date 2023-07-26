import { useState } from "react";

export const useFrom = (inicialFrom = {}) =>{
    const [fromState, setFromState] = useState(inicialFrom)

      const onInputChange =({target}) =>{
        const {name, value} = target

        setFromState({
            ...fromState,
            [name]: value,
        });
      };


    const onResetFrom = () => {
        setFromState(inicialFrom);
    };

  return{
    ...fromState,
       fromState,
       onInputChange,
       onResetFrom
  };
};