import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import React, { useEffect, useState } from "react";
import {
  LineChart
} from "react-native-chart-kit";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWj3rv3kQdNkBwx4Y3EsVsdXsBGQrGreQ",
  authDomain: "icytask-2f3ed.firebaseapp.com",
  databaseURL: "https://icytask-2f3ed-default-rtdb.firebaseio.com",
  projectId: "icytask-2f3ed",
  storageBucket: "icytask-2f3ed.appspot.com",
  messagingSenderId: "283639629352",
  appId: "1:283639629352:web:67be3e179675aa8e3dd71d"
};

initializeApp(firebaseConfig);

const config = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};
const tempData = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};
const humData = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};
var ledStatus = 0;
export default function App() {
  const [tempIndex, setTempIndex] = useState([""]);
  const [tempArray, setTempArray] = useState([1, 2, 3, 4, 5, 6]);
  const [humIndex, setHumIndex] = useState([""]);
  const [humArray, setHumArray] = useState([1, 2, 3, 4, 5, 6]);
  const [toggleData, setToggleData] = useState(true);
  const [toggleRoom, setToggleRoom] = useState("0")

  useEffect(() => {
    myFunction();
    return () => {
      setHumArray({}); // This worked for me
    };
}, []);

const myFunction = () => {
  const db = getDatabase();
  const reference = ref(db, "h");
  onValue(reference, (snapshot) => {
    const hum = snapshot.val();
    setHumArray(Object.values(hum));
});
};

useEffect(() => {
  myFunction2();
  return () => {
    setTempArray({}); // This worked for me
  };
}, []);

const myFunction2 = () => {
const db = getDatabase();
const reference = ref(db, "t");
onValue(reference, (snapshot) => {
  const temp = snapshot.val();
  setTempArray(Object.values(temp));
});
};
 /*  useEffect(() => {
    const fun = () => {
      const db = getDatabase();
      const reference = ref(db, "h");
      onValue(reference, (snapshot) => {
        const hum = snapshot.val();
        setHumArray(Object.values(hum));
      });
    };

    fun();
  }, []);
  useEffect(() => {
    const fun = () => {
      const db = getDatabase();
      const reference = ref(db, "t");
      onValue(reference, (snapshot) => {
        const temp = snapshot.val();
        setTempArray(Object.values(temp));
      });
    };

    fun();
  }, []); */
  if (tempArray.length > 10) {
    tempData.datasets[0].data = tempArray.slice(
      tempArray.length - 10,
      tempArray.length
    );
    tempData.labels = tempIndex.slice(
      tempIndex.length - 10,
      tempIndex.length
    );
  }
  else {
    tempData.datasets[0].data = tempArray;
    tempData.labels = tempIndex;
  }
  if (humArray.length > 10) {
    humData.datasets[0].data = humArray.slice(
      humArray.length - 10,
      humArray.length
    );
    humData.labels = humIndex.slice(
      humIndex.length - 10,
      humIndex.length
    );
  } else {
    humData.datasets[0].data = humArray;
    humData.labels = humIndex;
  }

 const ledAlarm = () => {
    if (ledStatus == 0) 
    {
      const db = getDatabase();
      const reference = ref(db, "status");
      set(reference, {
        status: 0
  });
  ledStatus = 1;
    }
    else if (ledStatus == 1) 
    {
      const db = getDatabase();
      const reference = ref(db, "status");
      set(reference, {
        status: 1
  });
  ledStatus = 0
    }
  }
  const changeData = () => {
    setToggleData(!toggleData);
    console.log(toggleData)
  }
  const changeRoom1 = () => {
    setToggleRoom("1")
  }
  const changeRoom2 = () => {
    setToggleRoom("2")
  }
  const changeRoom1Patient1 = () => {
    setToggleRoom("3")
  }
  const changeRoom1Patient2 = () => {
    setToggleRoom("4")
  }
  const changeRoom2Patient1 = () => {
    setToggleRoom("5")
  }
  const changeRoom2Patient2 = () => {
    setToggleRoom("6")
  }
  const goHome = () => {
    setToggleRoom("0")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {(toggleRoom == "0") ? <View>
      <Text style={styles.header}>Room 1</Text>
      <View style={styles.container1}>
        <LineChart style={styles.box}
          data={tempData}
          width={0.49*Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <LineChart style={styles.box}
          data={humData}
          width={0.49*Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button}><Button onPress={changeRoom1} title="Focus on Room 1" color="brown"></Button></View>
      
      </View>
      <Text style={styles.header}>Room 2</Text>
      <View style={styles.container1}>
        <LineChart style={styles.box}
          data={tempData}
          width={0.49*Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <LineChart style={styles.box}
          data={humData}
          width={0.49*Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
          <View style={styles.button}><Button onPress={changeRoom2} title="Focus on Room 2" color="brown"></Button></View>
      </View>
      </View> : (toggleRoom == "1") ? <View>
      <Text style={styles.header}>Room 1</Text>
      <View>
        <LineChart 
          data={tempData}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <LineChart
          data={humData}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button1}><Button onPress={changeRoom1Patient1} title="Focus on Patien 1" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={changeRoom1Patient2} title="Focus on Patient 2" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={goHome} title="Return Home" color="brown"></Button></View>
      
      </View>
      </View> : (toggleRoom == "2") ? <View>
      <Text style={styles.header}>Room 2</Text>
      <View>
        <LineChart 
          data={tempData}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <LineChart
          data={humData}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button1}><Button onPress={changeRoom2Patient1} title="Focus on Patien 1" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={changeRoom2Patient2} title="Focus on Patient 2" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={goHome} title="Return Home" color="brown"></Button></View>
      </View>
      </View> : (toggleRoom == "3") ? <View>
      <Text style={styles.header}>Patient 1</Text>
      <View>
        <LineChart 
          data={tempData}
          width={Dimensions.get("window").width} // from react-native
          height={350}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button1}><Button onPress={changeRoom1} title="Return to Room 1" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={goHome} title="Return Home" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={ledAlarm} title="Stop Reading" color="brown"></Button></View>

      </View>
      </View> : (toggleRoom == "4") ? <View>
      <Text style={styles.header}>Patient 2</Text>
      <View>
        <LineChart 
          data={humData}
          width={Dimensions.get("window").width} // from react-native
          height={350}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button1}><Button onPress={changeRoom1} title="Return to Room 1" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={goHome} title="Return Home" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={ledAlarm} title="Stop Reading" color="brown"></Button></View>

      </View>
      </View> : (toggleRoom == "5") ? <View>
      <Text style={styles.header}>Patient 1</Text>
      <View>
        <LineChart 
          data={tempData}
          width={Dimensions.get("window").width} // from react-native
          height={350}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button1}><Button onPress={changeRoom2} title="Return to Room 2" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={goHome} title="Return Home" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={ledAlarm} title="Stop Reading" color="brown"></Button></View>

      </View>
      </View> : <View>
      <Text style={styles.header}>Patient 2</Text>
      <View>
        <LineChart 
          data={humData}
          width={Dimensions.get("window").width} // from react-native
          height={350}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={config}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.button1}><Button onPress={changeRoom2} title="Return to Room 2" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={goHome} title="Return Home" color="brown"></Button></View>
        <View style={styles.button1}><Button onPress={ledAlarm} title="Stop Reading" color="brown"></Button></View>

      </View>
        </View>}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container1 : {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  box: {
    flexBasis: 75,
  },
  button: {
    borderRadius: 30,
    marginLeft: 120,
    alignItems: "center"
  },
  button1: {
    borderRadius: 30,
    marginBottom: 20,
    alignItems: "center"
  },
  header: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold"
  }

});