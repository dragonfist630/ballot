import React, { createContext, useCallback} from "react";

export const APIcontext = createContext();

export const APIProvider = (props) => {
  var queryObject = {id:"",queryName:"",optionName:[],value:[]};
  const changeQuery =useCallback( (id,name,options,value) => {
    // console.log(id,name,options,value);
    queryObject.id = id;
    queryObject.queryName = name;
    queryObject.optionName = options;
    queryObject.value = value;
    // console.log(queryObject);
  },[queryObject]);
  return <APIcontext.Provider value={{funcs:changeQuery,object:queryObject}}>{props.children}</APIcontext.Provider>;
};
