import { useParams } from 'react-router-dom';
import useProperty from '../../hooks/useProperty';
import ClipLoader from 'react-spinners/ClipLoader';

function Property() {
    const { id } = useParams();
    const url = `/properties/${id}`;

    const { data: property } = useProperty(url);

    if (property === undefined) {
        return <ClipLoader size={50} color={"#333333"} />
    }

    // Transform timestamp using:
    // new Date(property.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    
    // TODO: Finish design
    return (<></>);
}

export default Property;
