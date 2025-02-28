import { createStackNavigator } from '@react-navigation/stack';
import { ListProduct } from '../screens/ListProduct';
import { CreateProduct } from '../screens/CreateProduct';
import { Text } from 'react-native-gesture-handler';
import { DetailProduct } from '../screens/DetailProduct';
import { EditProduct } from '../screens/EditProduct';


export type RootStackParams = {
    Products: undefined
    addProduct: undefined;
    detailProduct: { id: string };
    editlProduct: { id: string };

}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: () => <Text style={{ color: '2A3E6E', marginRight: 60,  fontSize: 20, fontWeight: 600 }}>Banco</Text>,
                headerTitleAlign: 'center' // esto garantiza el centrado en iOS y Android
            }}
        >
            <Stack.Screen name="Products" component={ListProduct} />
            <Stack.Screen name="addProduct" component={CreateProduct} />
            <Stack.Screen name="detailProduct" component={DetailProduct} />
            <Stack.Screen name="editlProduct" component={EditProduct} />
        </Stack.Navigator>
    );
};