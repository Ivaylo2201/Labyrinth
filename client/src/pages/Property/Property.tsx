import { useParams } from 'react-router-dom';
import useProperty from '../../hooks/useProperty';

function Property() {
    const { id } = useParams();
    const url: string = `/properties/${id}`;

    const { data: property } = useProperty(url);

    if (property === undefined) {
        return <p>Loading...</p>;
        // return <Spinner />
    }

    
    // Transform timestamp using:
    // new Date(property.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    
    // TODO: Finish design
    return (<></>);
}

export default Property;
