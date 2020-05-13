import React, {useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  View,
  FlatList,
  Text
} from 'react-native';

import WasteCheck from '../../../components/waste/WasteCheckHook';


export default function indexHook() {
  // const myAccountStatus = useSelector((state) => state.myAccountStatus);
  const test = useSelector((state) => state);
  console.log('------------ TEST ---------------');
  console.log(test);

  const dispatch = useDispatch();

  /*
  [
      { code: 'PET - 1234', key: '1'},
      { code: 'PET - 5678', key: '2'},
      { code: 'PET - 9101', key: '3'}
    ])
  */

  const [containers, setContainers] = useState(null);

  const loadContainers = async () => {
    console.log('cargando Account...');
    // this.props.myAccount();
  }

  useEffect(() => {
    loadContainers();
  }, []);

  const pressHandler = (key) => {
    setContainers((prevContainers) => {
      return prevContainers.filter(waste => waste.key != key);
    });
  }

  return(
    <View>
    {/* 
      <FlatList
        data={myAccountStatus.data}
        renderItem={({ item })=>(
          <WasteCheck item={item} pressHandler={pressHandler} />
        )} 
      />
      */}
      <Text>PROBANDO...</Text>
    </View>
  );
}