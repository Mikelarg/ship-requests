import PropTypes from "prop-types";

export const Address = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
});

export const Request = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address_from_id: PropTypes.number.isRequired,
    address_from: Address.isRequired,
    address_to_id: PropTypes.number.isRequired,
    address_to: Address.isRequired,
});