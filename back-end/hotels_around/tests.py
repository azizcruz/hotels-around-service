from django.test import TestCase
import requests


class TestGetUserLocation(TestCase):

    def setUp(self):
        self.location = "walter+meckauer+strasse+13+nurnberg"
        self.geolocation = "49.44425,11.09542"

    def test_if_the_endpoint_returns_the_requested_address_data(self):
        res = self.client.post("/api/user_location/get", data={"geolocation": self.geolocation})
        self.assertEquals(res.json()['address'],  "Walter-Meckauer-Straße 13, 90478, Nuremberg, Germany")

    def test_if_user_submitted_a_non_exist_address(self):
        res = self.client.post("/api/user_location/get", data={"geolocation": "542,7376"})
        self.assertEquals(res.json()["error"], "Adderess does not exist")

class TestGetHotelsAroundLocation(TestCase):

    def setUp(self):
        self.location = "Goldberglstraße 17, 93413, Cham, Germany"
        self.geolocation = "49.209,12.698"
        self.radius = "1000"

    def test_if_hotels_are_returned_when_the_request_is_sent(self):
        res = self.client.get(f"/api/hotels_around/get/{self.geolocation}/{self.radius}")
        self.assertEquals(res.json()['data'][0]['hotel_name'], 'Am Oedenturm')

    def test_if_user_submitted_a_non_exist_address(self):
        res = self.client.get(f"/api/hotels_around/get/5524,362/{self.radius}")
        self.assertEquals(res.json()["error"], "Adderess does not exist")


class TestGetHotelsAroundBasedOnAddress(TestCase):

    def setUp(self):
        self.location = "Goldberglstraße+17+93413+Cham+Germany"
        self.geolocation = "49.209,12.698"
        self.radius = "1000"

    def test_if_hotels_are_returned_when_the_request_is_sent_with_an_address(self):
        res = self.client.get(f"/api/hotels_around_based_on_address/get/{self.location}/{self.radius}")
        self.assertEquals(res.json()['data'][0]['hotel_name'], 'Am Oedenturm')

    def test_if_user_submitted_a_non_exist_address(self):
        res = self.client.get(f"/api/hotels_around_based_on_address/get/fdsyffd/{self.radius}")
        self.assertEquals(res.json()["error"], "Adderess does not exist")
