from django.test import TestCase
from django.urls import reverse

from .serializers import *
from .models import *
from django.contrib.auth.models import User

from rest_framework.test import APITestCase
from rest_framework import status


# Create your tests here.


class CreateUserTestCase(APITestCase):

    def setUp(self):
        self.householder = {"username": "john", "password": "john", "first_name": "John",
                            "last_name": "Muhire", "email": "john@yahoo.fr", "is_staff": 0}
        self.url = reverse('user_create')
        self.url_login = reverse('token_obtain_pair')

    def test_create_user(self):
        response = self.client.post(self.url, self.householder, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], self.householder["email"])

    def test_login_user(self):
        self.client.post(self.url, self.householder, format="json")
        data = {"username": "john", "password": "john"}
        response = self.client.post(self.url_login, data, format="json")
        # import pdb
        # pdb.set_trace()
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserProfileTestCase(APITestCase):

    def setUp(self):
        self.token = ""
        self.householder = {"username": "john", "password": "john", "first_name": "John",
                            "last_name": "Muhire", "email": "john@yahoo.fr", "is_staff": 0}
        self.url_create = reverse('user_create')
        self.url = reverse('user_detail')
        self.url_login = reverse('token_obtain_pair')

    def test_can_view_profile(self):

        self.client.post(self.url_create, self.householder, format="json")
        data = {"username": "john", "password": "john"}
        response_token = self.client.post(self.url_login, data, format="json")

        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + response_token.data['access'])
        response = self.client.get(self.url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.householder["email"])

    def test_user_cannot_view_profile_with_incorect_credential(self):
        self.client.post(self.url_create, self.householder, format="json")
        data = {"username": "paul", "password": "john"}
        response = self.client.post(self.url_login, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CategoryTestCase(APITestCase):

    def setUp(self):

        self.category = ServiceCategory.objects.create(
            name="Cleaning", description="This is cleaning")

        self.url_view_all = reverse('view_categories')
        self.url_view = reverse('view_category', kwargs={
                                'category_id': self.category.pk})
        self.url_delete = reverse('delete_category', kwargs={
            'category_id': self.category.pk})
        self.url_update = reverse('update_category', kwargs={
            'category_id': self.category.pk})

    def test_view_categories(self):

        response = self.client.get(self.url_view_all, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_category(self):
        response = self.client.get(self.url_view, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_category(self):
        response = self.client.get(self.url_delete, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_category(self):
        response = self.client.get(self.url_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ServiceTestCase(APITestCase):

    def setUp(self):

        self.category = ServiceCategory.objects.create(
            name="Cleaning", description="This is cleaning")
        category = ServiceCategory.objects.get(pk=self.category.pk)
        self.service = Service.objects.create(
            name="Washing", category=category)

        self.url_view_all = reverse('view_services')

        self.url_view = reverse('view_service', kwargs={
                                'service_id': self.service.pk})
        self.url_delete = reverse('delete_service', kwargs={
            'service_id': self.service.pk})
        self.url_update = reverse('update_service', kwargs={
            'service_id': self.service.pk})

    def test_view_services(self):

        response = self.client.get(self.url_view_all, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_service(self):
        response = self.client.get(self.url_view, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_service(self):
        response = self.client.get(self.url_delete, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_service(self):
        response = self.client.get(self.url_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkerTestCase(APITestCase):

    def setUp(self):

        self.category = ServiceCategory.objects.create(
            name="Cleaning", description="This is cleaning")
        category = ServiceCategory.objects.get(pk=self.category.pk)
        self.service = Service.objects.create(
            name="Washing", category=category)
        service = Service.objects.get(pk=self.service.pk)
        user = User.objects.create(
            email="paul@gmail.com", username="paul", password="paul", is_staff=1)
        self.user = User.objects.get(pk=user.pk)
        worker = Worker.objects.create(
            name="Paul Tuyishime",
            email="paul@gmail.com",
            phone="0782987322",
            price=3400,
            address="KG_ST_001",
            image="",
            username="paul",
            category=category,
            service=service,
            user=user
        )
        self.worker = Worker.objects.get(pk=worker.pk)

        self.url_view_all = reverse('view_workers')
        self.url_filter = reverse('view_workers_filter')

        self.url_view = reverse('view_worker', kwargs={
                                'worker_id': self.worker.pk})
        self.url_delete = reverse('delete_worker', kwargs={
            'worker_id': self.worker.pk})
        self.url_update = reverse('update_worker', kwargs={
            'worker_id': self.worker.pk})

    def test_view_workers(self):

        response = self.client.get(self.url_view_all, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_worker(self):
        response = self.client.get(self.url_view, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_worker(self):
        response = self.client.get(self.url_delete, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_worker(self):
        response = self.client.get(self.url_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_worker(self):
        response = self.client.get(self.url_filter, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class BookingTestCase(APITestCase):

    def setUp(self):

        self.category = ServiceCategory.objects.create(
            name="Cleaning", description="This is cleaning")
        category = ServiceCategory.objects.get(pk=self.category.pk)
        self.service = Service.objects.create(
            name="Washing", category=category)
        service = Service.objects.get(pk=self.service.pk)
        client = User.objects.create(
            email="sarah@gmail.com", username="sarah", password="sarah")
        self.householder = User.objects.get(pk=client.pk)
        user = User.objects.create(
            email="paul@gmail.com", username="paul", password="paul", is_staff=1)
        self.user = User.objects.get(pk=user.pk)
        worker = Worker.objects.create(
            name="Paul Tuyishime",
            email="paul@gmail.com",
            phone="0782987322",
            price=3400,
            address="KG_ST_001",
            image="",
            username="paul",
            category=category,
            service=service,
            user=user
        )
        self.worker = Worker.objects.get(pk=worker.pk)

        self.data = {
            "client": client.pk,
            "service": service.pk,
            "worker": worker.pk,
            "date_booking": "2024-03-12",
            "time": "09:30 AM",
        }
        booking = Booking.objects.create(client=self.householder,
                                         service=self.service,
                                         worker=self.worker,
                                         date_booking="2024-03-11",
                                         time="10:30 AM",)
        self.booking_id = booking.pk
        self.url_add = reverse('add_booking')
        self.url_view_all = reverse('view_bookings')

        self.url_update = reverse('update_booking', kwargs={
            'booking_id': self.booking_id})
        self.url_delete = reverse('delete_booking', kwargs={
            'booking_id': self.booking_id})

    def test_add_bookings(self):

        response = self.client.post(self.url_add, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_view_booking(self):
        response = self.client.get(self.url_view_all, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_booking(self):
        response = self.client.get(self.url_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_booking(self):
        response = self.client.get(self.url_delete, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
