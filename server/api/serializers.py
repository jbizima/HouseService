from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import *


class LogoutUserSerializer(serializers.ModelSerializer):
    refresh_token = serializers.CharField()

    default_error_messages = {"bad_token": ("Token is Invalid")}

    def validate(self, attrs):
        self.token = attrs.get("refresh_token")
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()

        except TokenError:
            return self.fail("bad_token")


class CategoryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryImage
        fields = ("id", "category", "image")


class SerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class ServiceCategorySerializer(serializers.ModelSerializer):
    images = CategoryImageSerializer(many=True, read_only=True)
    # uploaded_images = serializers.ImageField(
    #     max_length=1000000, allow_empty_file=False, use_url=False, write_only=True
    # )
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(
            max_length=1000000, allow_empty_file=False, use_url=False
        ),
        write_only=True,
    )

    class Meta:
        model = ServiceCategory
        fields = "__all__"
        # fields = ("id", "name", "description", "images", "uploaded_images", "created_at")

    def create(self, validated_data):
        # when we can to edit inserting we use this function instead of default
        # we want to remove the uploaded_images file to separate 2 models category and image
        # add them separately.
        uploaded_images = validated_data.pop("uploaded_images")
        category = ServiceCategory.objects.create(**validated_data)
        # handle image model insert on itself, category will use the default insert
        for image in uploaded_images:
            newcategory_image = CategoryImage.objects.create(
                category=category, image=image
            )
        return category


class BookSerializer(serializers.ModelSerializer):
    service = Service
    service_name = serializers.ReadOnlyField(source="service.name")
    worker = Worker
    worker_email = serializers.ReadOnlyField(source="worker.email")
    worker_name = serializers.ReadOnlyField(source="worker.name")
    worker_price = serializers.ReadOnlyField(source="worker.price")
    client = User
    client_email = serializers.ReadOnlyField(source="client.email")
    client_firstname = serializers.ReadOnlyField(source="client.first_name")
    client_lastname = serializers.ReadOnlyField(source="client.last_name")

    class Meta:
        model = Booking
        fields = (
            "id",
            "service",
            "worker",
            "client",
            "date_booking",
            "time",
            "status",
            "read",
            "created_at",
            "updated_at",
            "service_name",
            "worker_name",
            "worker_email",
            "worker_price",
            "client_email",
            "client_firstname",
            "client_lastname",
        )
        extra_kwargs = {
            "created_at": {"read_only": True},
        }


class WorkerReportSerializer(serializers.ModelSerializer):

    worker_bookings = BookSerializer(read_only=True, many=True)

    class Meta:
        model = Worker
        fields = (
            "id",
            "name",
            "worker_bookings",
        )
        extra_kwargs = {
            "created_at": {"read_only": True},
        }


class WorkerSerializer(serializers.ModelSerializer):
    service = SerSerializer()
    category = ServiceCategory
    service_name = serializers.ReadOnlyField(source="service.name")
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = Worker
        fields = (
            "id",
            "name",
            "image",
            "service",
            "service_name",
            "category",
            "category_name",
            "phone",
            "email",
            "address",
            "price",
            "user",
            "username",
            "created_at",
        )
        extra_kwargs = {
            "created_at": {"read_only": True},
        }


class UserSerializer(serializers.ModelSerializer):
    worker = WorkerSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email",
            "is_superuser",
            "is_staff",
            "first_name",
            "last_name",
            "worker",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "is_superuser": {"read_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    

class ChangePasswordSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = User
        fields = ('password',)
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance    
    


class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategory
    category_name = serializers.ReadOnlyField(source="category.name")
    workers = WorkerSerializer(read_only=True, many=True)

    class Meta:
        model = Service
        fields = (
            "id",
            "name",
            "image",
            "category",
            "category_name",
            "created_at",
            "workers",
        )
        extra_kwargs = {
            # "category": {"write_only": True},
            "created_at": {"read_only": True},
        }


class BookingSerializer(serializers.ModelSerializer):
    service = Service
    service_name = serializers.ReadOnlyField(source="service.name")
    worker = Worker
    worker_email = serializers.ReadOnlyField(source="worker.email")
    worker_name = serializers.ReadOnlyField(source="worker.name")
    worker_price = serializers.ReadOnlyField(source="worker.price")
    client = User
    client_email = serializers.ReadOnlyField(source="client.email")
    client_firstname = serializers.ReadOnlyField(source="client.first_name")
    client_lastname = serializers.ReadOnlyField(source="client.last_name")

    class Meta:
        model = Booking
        fields = (
            "id",
            "service",
            "worker",
            "client",
            "date_booking",
            "time",
            "status",
            "read",
            "created_at",
            "updated_at",
            "service_name",
            "worker_name",
            "worker_email",
            "worker_price",
            "client_email",
            "client_firstname",
            "client_lastname",
        )
        extra_kwargs = {
            "created_at": {"read_only": True},
            "date_booking": {"read_only": True},
        }


# Statistic


class ServiceBookingSerializer(serializers.ModelSerializer):
    category = ServiceCategory
    category_name = serializers.ReadOnlyField(source="category.name")
    workers = WorkerSerializer(read_only=True, many=True)
    service_bookings = BookingSerializer(read_only=True, many=True)
    # total_bookings = serializers.IntegerField()
    # amount_bookings = serializers.IntegerField()

    class Meta:
        model = Service
        fields = (
            "id",
            "name",
            "workers",
            "category_name",
            "category",
            "service_bookings",
            # "total_bookings",
            # "amount_bookings",
        )


class CategorySerializer(serializers.ModelSerializer):
    nbr_bookings = serializers.IntegerField()
    amount_bookings = serializers.IntegerField()
    services = ServiceBookingSerializer(read_only=True, many=True)
    # total_bookings = serializers.ReadOnlyField(source="services__service_bookings")

    class Meta:
        model = ServiceCategory
        fields = ("id", "name", "nbr_bookings", "amount_bookings", "services")
