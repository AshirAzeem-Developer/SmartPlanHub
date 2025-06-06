import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';

//store
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import CustomSplash from './src/components/CustomSplash';
import RootNav from './src/navigators/navigator.root';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const [show, setshow] = useState(true);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            {show ? (
              <CustomSplash show={show} onEnd={() => setshow(false)} />
            ) : (
              <DataWrapper
                children={<RootNav />}
                key={Math.random().toString()}
              />
            )}
            {/* <RootNavigator /> */}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const DataWrapper = ({children}: {children: React.ReactNode}) => {
  // const userId = useSelector((state: any) => state?.user?.user?.user?.id);
  // const userToken = useSelector((state: any) => state?.user?.user?.jwt);

  // useOneSignalPush(userId?.toString(), userToken);
  // useHandleDeepLink();

  return (
    <>
      {children}
      {/* <ToastHandler /> */}
    </>
  );
};
