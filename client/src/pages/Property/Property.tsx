import { useParams } from 'react-router-dom';
import useProperty from '../../hooks/useProperty';


function Property() {
    const { id } = useParams();
    const url: string = `/properties/${id}`;

    const { data } = useProperty(url);

    console.log(data);

    // TODO: Design page
    return <div></div>;
}

export default Property;
