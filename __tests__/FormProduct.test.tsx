import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { NavigationContainer } from '@react-navigation/native';
import { TextInput, Button } from 'react-native';
import { useProducts } from '../src/presentation/hooks/useProducts';
import { FormProduct } from '../src/presentation/components/FormProduct';

// Mock de `useProducts`
jest.mock('../src/presentation/hooks/useProducts', () => ({
    useProducts: jest.fn()
}));

const mockCreateProduct = jest.fn();
const mockUpdateProduct = jest.fn();
const mockVerifyProduct = jest.fn().mockResolvedValue(false);

beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
        createProduct: mockCreateProduct,
        updateProduct: mockUpdateProduct,
        verifyProduct: mockVerifyProduct,
    });
});

describe('FormProduct Screen', () => {

    const renderWithNavigation = (props: any) => {
        return renderer.create(
            <NavigationContainer>
                <FormProduct {...props} />
            </NavigationContainer>
        );
    };

    test('renderiza correctamente en modo creación', () => {
        let tree;
        act(() => {
            tree = renderWithNavigation({ type: 'create' }).toJSON();
        });
        expect(tree).toMatchSnapshot(); // Snapshot para validar estructura inicial
    });

    test('muestra error si se envía sin ID', () => {
        const testRenderer = renderWithNavigation({ type: 'create' });

        act(() => {
            const button = testRenderer.root.findByProps({ title: 'Agregar' });
            button.props.onPress();
        });

        const errorMessage = testRenderer.root.findAllByProps({ children: 'El ID es obligatorio' });
        expect(errorMessage.length).toBe(1); // Debería aparecer el mensaje de error
    });

    test('valida formato de fecha incorrecto', () => {
        const testRenderer = renderWithNavigation({ type: 'create' });

        const fechaInput = testRenderer.root.findByProps({ placeholder: 'dd/mm/yyyy' });
        act(() => fechaInput.props.onChangeText('2025-02-30'));

        const button = testRenderer.root.findByProps({ title: 'Agregar' });
        act(() => button.props.onPress());

        const errorMessage = testRenderer.root.findAllByProps({ children: 'Formato inválido (dd/mm/yyyy)' });
        expect(errorMessage.length).toBe(1);
    });

    test('crea un producto correctamente', async () => {
        const testRenderer = renderWithNavigation({ type: 'create' });

        act(() => {
            testRenderer.root.findByProps({ placeholder: 'Ingresa el ID' }).props.onChangeText('123');
            testRenderer.root.findByProps({ placeholder: 'Ingresa el nombre' }).props.onChangeText('Producto Test');
            testRenderer.root.findByProps({ placeholder: 'Ingresa la descripción' }).props.onChangeText('Descripción válida');
            testRenderer.root.findByProps({ placeholder: 'URL del logo' }).props.onChangeText('https://example.com/logo.png');
            testRenderer.root.findByProps({ placeholder: 'dd/mm/yyyy' }).props.onChangeText('28/02/2025');
        });

        const button = testRenderer.root.findByProps({ title: 'Agregar' });
        await act(async () => {
            button.props.onPress();
        });

        expect(mockCreateProduct).toHaveBeenCalledWith({
            id: '123',
            nombre: 'Producto Test',
            descripcion: 'Descripción válida',
            logo: 'https://example.com/logo.png',
            fechaLiberacion: '28/02/2025',
            fechaRevision: '28/02/2026' // asumimos que el año se suma automáticamente
        });
    });

    test('no permite crear producto si el ID ya existe', async () => {
        mockVerifyProduct.mockResolvedValueOnce(true);

        const testRenderer = renderWithNavigation({ type: 'create' });

        const idInput = testRenderer.root.findByProps({ placeholder: 'Ingresa el ID' });

        await act(async () => {
            idInput.props.onChangeText('123');
            idInput.props.onBlur(); // Disparar la validación
        });

        const errorMessage = testRenderer.root.findAllByProps({ children: 'Este ID ya existe' });
        expect(errorMessage.length).toBe(1);
    });

});
