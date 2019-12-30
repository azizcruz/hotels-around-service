def format_response_json_data(data, response_data=None):
    if response_data is None:
        response_data = {'data': []}
    else:
        response_data['data'] = []

    response_object = {}

    for hotel in data['items']:
        response_object['position'] = hotel['position']
        response_object['hotel_name'] = hotel['title']
        response_object['rating'] = hotel['averageRating']
        response_object['distance'] = hotel['distance']
        response_object['link'] = hotel['href']
        response_object['icon'] = hotel['icon']
        response_data['data'].append(response_object)

        response_object = {}

    return response_data

def format_address(address_data):
    return  address_data['Label']
