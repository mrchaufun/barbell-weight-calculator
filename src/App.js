import React, { useState } from 'react';

import WeightInput from './components/weightInput';
import DisplayWeight from './components/displayWeight';
import BarToggle from './components/barToggle';
import KiloToggle from './components/kiloToggle';

const App = () => {
  const [weight, setWeight] = useState(null);
  const [bar, setBar] = useState(null);
  const [total, setTotal] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [units, setUnits] = useState([]);

  const POUNDS = [45, 35, 25, 15, 10, 5, 2.5];
  const KILOS = [20, 15, 10, 5, 2.5, 1.25];

  // Make a function that will convert Pounds to Kilos
  function convertWeight(u) {
    let units_;

    if (u === 'POUNDS') {
      units_ = POUNDS;
    }
    if (u === 'KILOS') {
      units_ = KILOS;
    }
    if (bar && weight) {
      calcWeight(bar, weight, units_);
    }
    setUnits(units_);
  }

  // Function to calculate selected bar with inputted weight and send to DisplayWeight Component
  const calcWeight = (barWeight, userWeight, weightMetric) => {
    let plates = units;

    if (weightMetric) {
      plates = weightMetric;
    }

    let calculated = [];

    let remainingWeight = userWeight - barWeight;
    setTotal(remainingWeight);

    for (let i = 0; i < plates.length; i++) {
      let count = Math.floor(remainingWeight / plates[i]);
      if (count % 2 !== 0) {
        count -= 1;
      }

      remainingWeight -= plates[i] * count;

      calculated.push(count);
    }
    setRemaining(remainingWeight);
    setTotal(calculated);
  };

  return (
    <div className='block text-center'>
      <KiloToggle
        weight={weight}
        bar={bar}
        calcWeight={calcWeight}
        convertWeight={convertWeight}
      />
      <h1 className='mt-20 text-3xl'>Barbell Buddy</h1>
      <BarToggle bar={bar} setBar={setBar} />
      <WeightInput
        bar={bar}
        calcWeight={calcWeight}
        weight={weight}
        setWeight={setWeight}
      />
      {total && (
        <DisplayWeight units={units} total={total} remaining={remaining} />
      )}
    </div>
  );
};

export default App;
