import type { Product } from "../../core/entities/product.entity";
import { ProductResponse } from "../interfaces/product.responses";
import { formatDateToDDMMYYYY, formatDateToYYYYMMDD } from "../../config/helpers/functions"


export class ProductMapper {
    static fromProductResultToEntity( result: any): Product {
        return {
            id: result?.id,
            nombre: result.name,
            descripcion: result?.description,
            logo: result?.logo,
            fechaLiberacion: formatDateToDDMMYYYY(result?.date_release),
            fechaRevision: formatDateToDDMMYYYY(result?.date_revision)
        }
    }
    static fromProductRequest( product: Product): ProductResponse {
        return {
            id: product?.id,
            name: product.nombre,
            description: product?.descripcion,
            logo: product?.logo,
            date_release: formatDateToYYYYMMDD(product?.fechaLiberacion),
            date_revision: formatDateToYYYYMMDD(product?.fechaRevision)
        }
    }
}