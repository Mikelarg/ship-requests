import L from "leaflet";
import "leaflet-routing-machine";
import {useMap} from "react-leaflet";
import {useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Request} from "./propTypes";

import icon from 'leaflet/dist/images/marker-icon.png';

const createRoutineMachineLayer = (props) => {
    const {currentRequest} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const map = useMap();


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!map) return;
        let wayPoints = [];
        if (currentRequest) {
            wayPoints = [
                L.latLng(currentRequest.address_from.lat, currentRequest.address_from.lon),
                L.latLng(currentRequest.address_to.lat, currentRequest.address_to.lon)
            ]
        }
        const instance = L.Routing.control({
            waypoints: wayPoints,
            createMarker: function (i, wp, nWps) {
                // here change all the others
                let text = '';
                if (i === 0) {
                    text = 'Откуда'
                } else {
                    text = 'Куда'
                }
                let myIcon = L.divIcon({
                    className: 'my-div-icon',
                    html: `<img class="my-div-image" src="${icon}"/>` +
                        `<span class="marker-span">${text}</span>`
                });
                return L.marker(wp.latLng, {
                    icon: myIcon
                });
            },
            lineOptions: {
                styles: [{color: "#6FA1EC", weight: 4}]
            },
            show: false,
            addWaypoints: false,
            routeWhileDragging: true,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false
        }).addTo(map);

        return () => map.removeControl(instance);
    }, [map, currentRequest]);
    return null;
};

createRoutineMachineLayer.propTypes = {
    currentRequest: PropTypes.oneOfType([Request, PropTypes.instanceOf(null)])
};

const RoutineMachine = connect(state => ({
    currentRequest: state.currentRequest
}))(createRoutineMachineLayer);

export default RoutineMachine;
