import { useParams } from 'react-router-dom';
import useProperty from '../../hooks/useProperty';

function Property() {
    const { id } = useParams();
    const url: string = `/properties/${id}`;

    const { data, isLoading } = useProperty(url);

    console.log(data);

    if (isLoading || !data) {
        // смени със спинър или нещо тма
        return <h1>Loading...</h1>;
    }

    // mizeren kod kolkoto da ima neshto (molq iztrii go ako bachkash po tva)
    return (
        <div className='flex flex-wrap'>
            <div>
                <div id='property-type'>{data.type}</div>
                <div id='property-price'>${data.price}</div>

                <p>
                    <strong>Status:</strong>{' '}
                    <span id='property-status'>{data.status}</span>
                </p>
                <p>
                    <strong>Address:</strong>{' '}
                    <span id='property-address'>
                        {data.address.street}, {data.address.city},{' '}
                        {data.address.country}
                    </span>
                </p>

                <p>
                    <strong>Bathrooms:</strong>{' '}
                    <span id='property-bathrooms'>{data.bathrooms}</span>
                </p>
                <p>
                    <strong>Bedrooms:</strong>{' '}
                    <span id='property-bedrooms'>{data.bedrooms}</span>
                </p>
                <p>
                    <strong>Area:</strong>{' '}
                    <span id='property-area'>{data.area} sq ft</span>
                </p>

                <p id='property-description'>{data.description}</p>

                <div className='property-images' id='property-images'>
                    {data.images.map((image, index) => (
                        <img
                            key={index}
                            src={`http://127.0.0.1:8000/storage/${image}`}
                            alt={`Property Image ${index + 1}`}
                        />
                    ))}
                </div>

                <div className='property-features' id='property-features'>
                    {data.features.map((feature, index) => (
                        <span key={index} className='feature-item'>
                            {feature}
                        </span>
                    ))}
                </div>

                <div className='user-info'>
                    <p>
                        <strong>Posted by:</strong>{' '}
                        <span id='user-name'>{data.user.username}, {data.user.phone_number}</span>
                    </p>
                    <p>
                        <strong>Posted on:</strong>{' '}
                        <span id='created-at'>
                            {new Date(data.created_at).toLocaleDateString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Property;
