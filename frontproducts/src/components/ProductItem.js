import { Link, useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../helpers/helpServiceUrl';
import { useDispatch } from 'react-redux';
import { deleteAction } from '../actions/crudActions';

function ProductItem({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function eliminarProducto(id) {
        //var confirmDelete = confirm("Se eliminará el producto con id " + id);
        //if (confirmDelete) {
        const deleteProduct = async (id) => {
            const response = await fetch(PRODUCT_URL + id, { method: 'DELETE' });
            if (response.ok) {
                dispatch(deleteAction(id));
                    navigate('/');
                }
            }
            deleteProduct(id);
        //}
    }
    return <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td className="d-flex justify-content-around">
            <Link to={`/edit-product/${product.id}`}><button>Editar</button></Link>
            <button onClick={() => eliminarProducto(product.id)}>Eliminar</button>
        </td>
    </tr>
}

export default ProductItem;