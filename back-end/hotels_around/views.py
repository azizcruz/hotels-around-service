import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class GetUserLocation(APIView):
    '''
    This view is used to get the user address geo location
    '''
    def post(self, request):
        '''
        :param request:
        :return: user's address location
        add user and searches
        '''
        location = request.data.get('geolocation', None)
        if not location:
            Response({'error': 'sorry, something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
        url = f"https://places.sit.ls.hereapi.com/places/v1/browse?app_id=rBwpW3TqbDh1ywZ0IMCV&apiKey=AAo51Nl1VI0V34sBNx6OOxj4Lx08ZePDf84GDkQiC_k&" \
              f"in={location};r=100&q=hotel"
        response = requests.get(url)
        address = response.json()['search']['context']['location']['address']
        street = address['street']
        house = address['house']
        city = address['city']
        postal_code = address['postalCode']
        country = address['country']
        address = f"{street} {house}, {postal_code}, {city}, {country}"
        payload = {
            'address': address,
            'geolocation': location
        }

        return Response(payload, status=status.HTTP_200_OK)


class GetHotelsAroundLocation(APIView):
    '''
    This view will be used to get hotels around location.
    '''
    def get(self, request, geolocation, radius, *args, **kwargs):

        url = f"https://places.sit.ls.hereapi.com/places/v1/browse?app_id=rBwpW3TqbDh1ywZ0IMCV&apiKey=AAo51Nl1VI0V34sBNx6OOxj4Lx08ZePDf84GDkQiC_k&" \
              f"in={geolocation};r={radius}&q=hotel"
        response = requests.get(url)
        data = response.json()['results']
        response_data = []
        response_object = {}
        for hotel in data['items']:
            response_object['position'] = hotel['position']
            response_object['hotel_name'] = hotel['title']
            response_object['rating'] = hotel['averageRating']
            response_object['distance'] = hotel['distance']
            response_object['link'] = hotel['href']
            response_object['icon'] = hotel['icon']
            response_data.append(response_object)
            response_object = {}

        return Response(response_data, status=status.HTTP_200_OK)
