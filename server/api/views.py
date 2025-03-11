# django
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count, Sum

# json
import json

# rest_framework
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.views import APIView


# social account
from allauth.socialaccount.models import SocialToken, SocialAccount

# custom packages (models, serializers, etc..)
from .serializers import *
from .models import *


User = get_user_model()


def home(request):
    return JsonResponse(
        {"message": "Welcome to the house service backend"}, status=status.HTTP_200_OK
    )


class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserProfileAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        # return Response(self.request.user, status=status.HTTP_200_OK)
        return self.request.user


# create user detail class


@login_required
def google_login_callback(request):
    user = request.user
    social_accounts = SocialAccount.objects.filter(user=user)
    print("social acc", social_accounts)
    social_account = social_accounts.first()

    if not social_account:
        print("No social acc for user", user)
        return redirect("http://localhost:5173/login/callback/?error=NoSocialAccount")

    token = SocialToken.objects.filter(
        account=social_account, account__provider="google"
    ).first()

    if token:
        print("google token found", token.token)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return redirect(
            f"http://localhost:5173/login/callback/?access_token={access_token}"
        )
    else:
        print("No Token found for user", user)
        return redirect("http://localhost:5173/login/callback/?error=NoGoogleToken")


@csrf_exempt
def validate_google_token(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            google_access_token = data.get("access_token")
            print("google token", google_access_token)

            if not google_access_token:
                return JsonResponse(
                    {"detail": "Access token is missing"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return JsonResponse({"valid": True}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid json"}, status=status.HTTP_400_BAD_REQUEST
            )

    return JsonResponse(
        {"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


class LogoutUserView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("hello")
        refresh_token = json.loads(request.body)
        token = RefreshToken(refresh_token.get("refresh_token"))
        token.blacklist()
        return JsonResponse({"token": "refresh_token"}, status=status.HTTP_200_OK)


class CreateServiceCategoryAPIView(generics.CreateAPIView):
    model = ServiceCategory
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)


class ServiceCategoryList(generics.ListAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class ServiceCategoryListNoPagination(generics.ListAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None


class ServiceCategoryDetails(generics.RetrieveAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "category_id"


class ServiceCategoryUpdate(generics.RetrieveUpdateAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "category_id"


class ServiceCategoryDelete(generics.RetrieveDestroyAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "category_id"


class CategoryImageAdd(generics.CreateAPIView):
    model = CategoryImage
    serializer_class = CategoryImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)


class CategoryImageUpdate(generics.RetrieveUpdateAPIView):
    queryset = CategoryImage.objects.all()
    serializer_class = CategoryImageSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "image_id"


class CreateServiceAPIView(generics.CreateAPIView):
    model = Service
    serializer_class = ServiceSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]


class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class ServiceListNoPagination(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class ServiceListFilter(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    pagination_class = None
    filterset_fields = ["category"]


class ServiceDetails(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "service_id"


class ServiceUpdate(generics.RetrieveUpdateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "service_id"


class ServiceDelete(generics.RetrieveDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "service_id"


class CreateWorkerAPIView(generics.CreateAPIView):
    model = Worker
    permission_classes = [AllowAny]
    serializer_class = WorkerSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("username")
        print(request.data.get("service"))

        service = Service.objects.get(pk=request.data.get("service"))

        count = User.objects.filter(username=username).count()
        if count > 0:
            return JsonResponse(
                {"username": ["Username is taken"]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        User.objects.create(
            email=email, username=username, password=password, is_staff=1
        )

        user1 = User.objects.get(username=request.data["username"])
        user1.set_password(password)
        user1.save()

        category = ServiceCategory.objects.get(pk=service.category_id)

        create_worker = Worker.objects.create(
            name=request.data["name"],
            email=request.data["email"],
            phone=request.data["phone"],
            price=request.data["price"],
            address=request.data["address"],
            image=request.data["image"],
            username=request.data["username"],
            category=category,
            service=service,
            user=user1,
        )
        return JsonResponse(
            {"success": "Successfully Inserted"},
            status=status.HTTP_201_CREATED,
        )


class WorkerList(generics.ListAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class WorkerReportList(generics.ListAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerReportSerializer
    permission_classes = [AllowAny]
    # pagination_class = None


class WorkerReportListPrint(generics.ListAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerReportSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class WorkerNoPagination(generics.ListAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class WorkerListFilter(generics.ListAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    pagination_class = None
    filterset_fields = ["category"]


class WorkerDetails(generics.RetrieveAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "worker_id"


class WorkerUpdate(generics.RetrieveUpdateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "worker_id"


class WorkerDelete(generics.RetrieveDestroyAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "worker_id"


class CreateBookingAPIView(generics.CreateAPIView):
    model = Booking
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        client_id = request.data.get("client")
        service_id = request.data.get("service")
        worker_id = request.data.get("worker")
        date = request.data.get("date_booking")
        time = request.data.get("time")
        service = Service.objects.get(pk=service_id)
        worker = Worker.objects.get(pk=worker_id)
        client = User.objects.get(pk=client_id)
        try:
            booking = Booking.objects.get(
                date_booking=date, service=service_id, worker=worker_id, client=client_id
            )
            if booking.time == time:
                return JsonResponse(
                    {"error": ["You have already booked"]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            elif booking.status == "1" or booking.status == "2":
                return JsonResponse(
                    {"error": ["You have already booked"]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                Booking.objects.create(
                    date_booking=date, client=client, worker=worker, service=service, time=time)
                return JsonResponse(
                    {"success": "Successfully Inserted"},
                    status=status.HTTP_201_CREATED,
                )

        except Booking.DoesNotExist:
            Booking.objects.create(
                date_booking=date, client=client, worker=worker, service=service, time=time)
            return JsonResponse(
                {"success": "Successfully Inserted"},
                status=status.HTTP_201_CREATED,
            )


class UpdateUser(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "user_id"


class ChangePasswordView(generics.UpdateAPIView):

    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    lookup_url_kwarg = "user_id"


class BookingList(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]


class BookingListOwner(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        owner_id = self.request.query_params.get("worker_id")
        from_date = self.request.query_params.get("from_date")
        to_date = self.request.query_params.get("to_date")
        if owner_id is not None and from_date is not None:
            worker = Worker.objects.get(pk=owner_id)
            self.queryset = self.queryset.filter(
                worker=worker, date_booking__range=(from_date, to_date))

        return self.queryset


class BookingStatusList(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        status = self.request.query_params.get("status")
        if status is not None:
            self.queryset = self.queryset.filter(status=status)

        return self.queryset


class BookingWorkerStatusList(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        status = self.request.query_params.get("status")
        worker_id = self.request.query_params.get("worker_id")

        if status is not None and worker_id != "undefined":
            worker = Worker.objects.get(pk=worker_id)
            self.queryset = self.queryset.filter(worker=worker, status=status)

        return self.queryset


class BookingWorkerStatus(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        status = self.request.query_params.get("status")
        worker_id = self.request.query_params.get("worker_id")

        if status is not None:
            worker = Worker.objects.get(pk=worker_id)
            self.queryset = self.queryset.filter(worker=worker, status=status)
        else:
            worker = Worker.objects.get(pk=worker_id)
            self.queryset = self.queryset.filter(worker=worker)
            print("hee", worker_id)

        return self.queryset


class BookingClientList(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        client = self.request.query_params.get("client")
        user = User.objects.get(pk=client)
        update = self.request.query_params.get("update")
        if update == None:
            bookings = Booking.objects.filter(client=user)
            for booking in bookings:
                b = Booking.objects.get(pk=booking.id)

                if not b.read == "1":
                    b.read = "1"
                b.save()

        if client is not None:
            self.queryset = self.queryset.filter(client=user)
        return self.queryset


class BookingRangeDate(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        from_date = self.request.query_params.get("from_date")
        to_date = self.request.query_params.get("to_date")
        if from_date is not None:
            self.queryset = self.queryset.filter(
                date_booking__range=(from_date, to_date)
            )
        return self.queryset


class BookingRangeDateWorker(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        from_date = self.request.query_params.get("from_date")
        to_date = self.request.query_params.get("to_date")
        worker_id = self.request.query_params.get("worker_id")

        if from_date is not None and worker_id is not None:
            worker = Worker.objects.get(pk=worker_id)
            self.queryset = self.queryset.filter(
                date_booking__range=(from_date, to_date), worker=worker
            )

        return self.queryset


class BookingRangeDatePrint(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        from_date = self.request.query_params.get("from_date")
        to_date = self.request.query_params.get("to_date")
        status = self.request.query_params.get("status")
        if from_date is not None:
            self.queryset = self.queryset.filter(
                date_booking__range=(from_date, to_date)
            )
        elif status is not None:
            self.queryset = self.queryset.filter(status=status)
        else:
            self.queryset = Booking.objects.all()
        return self.queryset


class BookingRangeDatePrintWorker(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ["service__name", "worker__name"]

    def get_queryset(self):

        from_date = self.request.query_params.get("from_date")
        to_date = self.request.query_params.get("to_date")
        worker = Worker.objects.get(
            pk=self.request.query_params.get("worker_id"))
        if from_date is not None:
            self.queryset = self.queryset.filter(
                date_booking__range=(from_date, to_date), worker=worker
            )
        return self.queryset


class BookingUpdate(generics.RetrieveUpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "booking_id"


class BookingDelete(generics.RetrieveDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "booking_id"


class GetBooking(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        data = request.query_params
        print(data)
        service_id = data.get("service_id")
        client_id = data.get("client_id")
        worker_id = data.get("worker_id")
        date = data.get("date")

        try:
            booking = Booking.objects.get(
                date_booking=date, service=service_id, worker=worker_id
            )
            booking_time = booking.time

            return JsonResponse(
                {"time": booking_time, "status": True}, status=status.HTTP_200_OK
            )

        except Booking.DoesNotExist:
            return JsonResponse(
                {"time": None, "status": False}, status=status.HTTP_200_OK
            )


class ServiceBookings(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceBookingSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    # def get_queryset(self):

    #     return Service.objects.annotate(
    #         total_bookings=Count('service_bookings'),
    #         amount_bookings = Sum('service_bookings__worker__price')
    #     )


class CategoryBookings(generics.ListAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):

        return ServiceCategory.objects.annotate(
            nbr_bookings=Count("services__service_bookings"),
            amount_bookings=Sum("services__service_bookings__worker__price"),
        )


""" NB categories will work for bar, so if i chose to use annonate it has to be on every api model"""
