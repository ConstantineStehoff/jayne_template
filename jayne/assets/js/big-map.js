/* This script sets up and configures the background map */

// ******************************* Configuration start **************************//


var gm_address_latitude = -37.815209, //Latitude and longitude address
	gm_address_longitude = 144.965429,
	gm_landscape_color = '#34495E', //Landscape color
	gm_water_color = '#2C3E50', //Water color
	gm_offset_x = -300, //Offset of the map center x-axis
	gm_offset_y = 0, //Offset of the map center y-axis
	gm_circle_color = '#00B4FF'; //Color of the address highlighter

// ******************************* Configuration end **************************//

function offsetCenter(e,t,n){var r=Math.pow(2,map.getZoom());var i=new google.maps.LatLng(map.getBounds().getNorthEast().lat(),map.getBounds().getSouthWest().lng()),s=map.getProjection().fromLatLngToPoint(e),o=new google.maps.Point(t/r||0,n/r||0),u=new google.maps.Point(s.x-o.x,s.y+o.y),a=map.getProjection().fromPointToLatLng(u);return a}function initialize(){var e={center:place,zoom:10,disableDefaultUI:true,draggable:false,zoomControl:false,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.TOP_LEFT},scrollwheel:false,mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,MY_MAPTYPE_ID]},mapTypeId:MY_MAPTYPE_ID};map=new google.maps.Map(document.getElementById("map-canvas"),e);var t={name:"Custom Style"},n=new google.maps.StyledMapType(darkBlue,t);map.mapTypes.set(MY_MAPTYPE_ID,n);google.maps.event.addListener(map,"bounds_changed",function(){var e=offsetCenter(place,gm_offset_x,gm_offset_y);map.setCenter(e);var t=new google.maps.Marker({position:place,map:map,icon:k})})}var map,place=new google.maps.LatLng(gm_address_latitude,gm_address_longitude),MY_MAPTYPE_ID="custom_style",darkBlue=[{stylers:[{hue:"#2C3E50"},{visibility:"simplified"},{gamma:.5},{weight:.5}]},{featureType:"all",stylers:[{visibility:"off"}]},{featureType:"road",stylers:[{visibility:"on"}]},{featureType:"landscape",stylers:[{visibility:"on"}]},{featureType:"water",stylers:[{visibility:"on"}]},{elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"water",stylers:[{color:gm_water_color}]},{featureType:"landscape",stylers:[{color:gm_landscape_color}]}],k={path:google.maps.SymbolPath.CIRCLE,fillOpacity:1,fillColor:gm_circle_color,strokeOpacity:1,strokeColor:gm_circle_color,strokeWeight:1,scale:14};google.maps.event.addDomListener(window,"load",initialize);
      	