import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {checkIngredient} from '../actions/index';

function Ingredient({ name, measures, original }) {
  const checkHandler = useSelector((state) => state.checkReducer);
  const dispatch = useDispatch();
    const [check, setCheck] = useState(false);
  
  const { amount, unitShort } = measures.metric;
  return (
    <div className="col s6">
        <div className={check? 'card green lighten-2' : 'card'} >
      
        <div className="center">
          <h4>{name}</h4>
        </div>

        <div className="card-content" style={{paddingTop: 5}}>
          <ul>
            <li>
              {amount} - {unitShort}
            </li>
            <li>{original}</li>
          </ul>
        </div>
        <div className="card-action">
          <button className='btn green darken-1' onClick={() => dispatch(checkIngredient(true))} >Check <i className="tiny material-icons">done</i></button>
        </div>
      </div>
    </div>
  );
}

export default Ingredient;
