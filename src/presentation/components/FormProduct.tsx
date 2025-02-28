import React from 'react'
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { globalStyles } from '../theme/global.styles';
import { Product } from '../../core/entities/product.entity';
import { useProducts } from '../hooks/useProducts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigation';

interface Props {
    type: 'create' | 'edit',
    product?: Product
}

export const FormProduct = ({ type, product }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
            id: '',
            nombre: '',
            descripcion: '',
            logo: '',
            fechaLiberacion: '',
            fechaRevision: '',
        },
        values: product
    });


    const {
        createProduct,
        updateProduct
    } = useProducts({ type: 'create' });

    const esFechaValida = (fecha: any) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/; // formato dd/mm/yyyy
        if (!regex.test(fecha)) return 'Formato inválido (dd/mm/yyyy)';

        const [day, month, year] = fecha.split('/').map(Number);
        const fechaObj = new Date(year, month - 1, day);

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (isNaN(fechaObj.getTime())) return 'Fecha inválida';
        if (fechaObj < hoy) return 'La fecha debe ser igual o mayor a hoy';

        return true;
    };

    const calcularFechaRevision = (fecha: any) => {
        const [day, month, year] = fecha.split('/').map(Number);
        const fechaRevision = new Date(year + 1, month - 1, day);
        return fechaRevision.toLocaleDateString('es-ES');
    };

    const handleFechaLiberacionChange = (fecha: any) => {
        setValue('fechaLiberacion', fecha, { shouldValidate: true });

        if (esFechaValida(fecha) === true) {
            const revision = calcularFechaRevision(fecha);
            setValue('fechaRevision', revision);
        } else {
            setValue('fechaRevision', '');
        }
    };

    const onSubmit = (data: any) => {
        try {
            if (type === 'create') {
                createProduct(data);
            } else {
                updateProduct(data.id, data)
            }
            reset();
            navigation.navigate('Products');
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <Text style={styles.label}>ID</Text>
            <Controller
                control={control}
                name="id"
                rules={{ 
                    required: 'El ID es obligatorio', 
                    minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' },
                    maxLength: { value: 10, message: 'Debe tener máximo 10 caracteres' }
                }}
                
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.id && styles.inputError]}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Ingresa el ID"
                    />
                )}
            />
            {errors.id && <Text style={styles.errorText}>{errors.id.message}</Text>}

            <Text style={styles.label}>Nombre</Text>
            <Controller
                control={control}
                name="nombre"
                rules={{ 
                    required: 'El nombre es obligatorio', 
                    minLength: { value: 5, message: 'Debe tener al menos 3 caracteres' },
                    maxLength: { value: 100, message: 'Debe tener máximo 50 caracteres' }
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.nombre && styles.inputError]}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Ingresa el nombre"
                    />
                )}
            />
            {errors.nombre && <Text style={styles.errorText}>{errors.nombre.message}</Text>}

            <Text style={styles.label}>Descripción</Text>
            <Controller
                control={control}
                name="descripcion"
                rules={{ 
                    required: 'La descripción es obligatoria', 
                    minLength: { value: 10, message: 'Debe tener al menos 3 caracteres' },
                    maxLength: { value: 200, message: 'Debe tener máximo 50 caracteres' }
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.descripcion && styles.inputError]}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Ingresa la descripción"
                    />
                )}
            />
            {errors.descripcion && <Text style={styles.errorText}>{errors.descripcion.message}</Text>}

            <Text style={styles.label}>Logo</Text>
            <Controller
                control={control}
                name="logo"
                rules={{
                    required: 'El logo es obligatorio',
                    // pattern: {
                    //     value: /^https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                    //     message: 'Debe ser una URL válida de imagen'
                    // }
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.logo && styles.inputError]}
                        value={value}
                        onChangeText={onChange}
                        placeholder="URL del logo"
                    />
                )}
            />
            {errors.logo && <Text style={styles.errorText}>{errors.logo.message}</Text>}

            <Text style={styles.label}>Fecha Liberación</Text>
            <Controller
                control={control}
                name="fechaLiberacion"
                rules={{
                    required: 'Campo requerido',
                    validate: esFechaValida
                }}
                render={({ field: { value } }) => (
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={handleFechaLiberacionChange}
                        placeholder="dd/mm/yyyy"
                        keyboardType="numeric"
                    />
                )}
            />
            {errors.fechaLiberacion && <Text style={styles.error}>{errors.fechaLiberacion.message}</Text>}

            <Text style={styles.label}>Fecha Revisión</Text>
            <Controller
                control={control}
                name="fechaRevision"
                rules={{ required: 'Campo requerido' }}
                render={({ field: { value } }) => (
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={value}
                        editable={false}
                    />
                )}
            />
            {errors.fechaRevision && <Text style={styles.error}>{errors.fechaRevision.message}</Text>}

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    style={globalStyles.prymaryButton}
                >
                    <Text style={globalStyles.prymaryButtonText}>{type=== "create" ? 'Agregar' : 'Editar'}</Text>
                </Pressable>
                <Pressable
                    onPress={() => reset()}
                    style={globalStyles.secondaryButton}
                >
                    <Text style={globalStyles.secondaryButtonText}>Reiniciar</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
        color: '#888',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});





