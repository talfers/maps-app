import axios from 'axios';
import yelp_config from '../config/yelp';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${yelp_config.YELP_API_KEY}`
  }
});

const getData = async (region) => {
  try {
    let res = await api.get('/businesses/search', {
      params: {
        limit: 15,
        categories: 'coffee,coffeeroasteries,coffeeshops',
        latitude: region.latitude,
        longitude: region.longitude
      }
    })
    var newData = res.data.businesses.map(business => {
      return {
        id: business.id,
        name: business.name,
        coords: business.coordinates,
        phone: business.display_phone,
        address: business.location.display_address,
        price: business.price,
        rating: business.rating,
        review_count: business.review_count,
        url: business.url
      };
    })
    return newData;
  } catch (error) {
    console.log(error);
  }
}


export default {
  getData
};
