import requests
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils.format_response_json_data import format_response_json_data, format_address
from .models import ClientCountry

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

        # To gather data about users from which countries are using the app.

        try:
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

        except:
            return Response({'error': 'Adderess does not exist'}, status=status.HTTP_404_NOT_FOUND)
        finally:

            try:
                ClientCountry.objects.create(country=country)
            except IntegrityError as e:
                if "UNIQUE constraint" in e.args[0]:
                    # do nothing
                    pass
            return Response(payload, status=status.HTTP_200_OK)


class GetHotelsAroundLocation(APIView):
    '''
    This view will be used to get hotels around location.
    '''

    def get(self, request, geolocation, radius, *args, **kwargs):
        url = f"https://places.sit.ls.hereapi.com/places/v1/browse?app_id=rBwpW3TqbDh1ywZ0IMCV&apiKey=AAo51Nl1VI0V34sBNx6OOxj4Lx08ZePDf84GDkQiC_k&" \
              f"in={geolocation};r={radius}&q=hotel"

        try:
            response = requests.get(url)
            data = response.json()['results']
            response_data = format_response_json_data(data)

            return Response(response_data, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Adderess does not exist'}, status=status.HTTP_404_NOT_FOUND)


class GetHotelsAroundBasedOnAddress(APIView):
    '''
    This api view will make two requests, one. for getting the address geolocations,
    two. for getting the hotels around this geo location.
    '''

    def get(self, request, address, radius):
        try:
            # Get address geolocation
            get_geolocation_url = f'https://geocoder.ls.hereapi.com/6.2/geocode.json?apikey=AAo51Nl1VI0V34sBNx6OOxj4Lx08ZePDf84GDkQiC_k&searchtext={address}'
            response = requests.get(get_geolocation_url)
            geolocation = response.json()['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']
            address = response.json()['Response']['View'][0]['Result'][0]['Location']['Address']
            address = format_address(address)

            # Get hotels around
            get_hotels_around_url = f"https://places.sit.ls.hereapi.com/places/v1/browse?app_id=rBwpW3TqbDh1ywZ0IMCV&apiKey=AAo51Nl1VI0V34sBNx6OOxj4Lx08ZePDf84GDkQiC_k&" \
                                    f"in={geolocation['Latitude']},{geolocation['Longitude']};r={radius}&q=hotel"
            response = requests.get(get_hotels_around_url)
            data = response.json()['results']
            response_data = {'new_geolocation': f"{geolocation['Latitude']},{geolocation['Longitude']}",
                             'new_address': address}

            response_data = format_response_json_data(data, response_data)

            return Response(response_data, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Adderess does not exist'}, status=status.HTTP_404_NOT_FOUND)
