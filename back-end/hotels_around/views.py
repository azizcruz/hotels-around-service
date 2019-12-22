from rest_framework.views import APIView

class GetLocation(APIView):
    '''
    This view is used to get the user address geo location
    '''
    def get(self, request):
        pass