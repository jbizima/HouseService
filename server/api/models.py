from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User

# Create your models here.


class ServiceCategory(models.Model):

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    slug = models.SlugField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CategoryImage(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="images", default="", null=True, blank=True)


class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name="services", default=None
    )
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to="images", default="", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Worker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="worker", default=None)
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, related_name="workers", default=None
    )
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name="workers", default=None
    )
    
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=100, unique=True)
    phone = models.IntegerField()
    price = models.IntegerField()
    address = models.CharField(max_length=50)
    image = models.ImageField(upload_to="images", default="", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    class BookingStatus(models.TextChoices):
        PENDING = "1", "Pending"
        APPROVED = "2", "Approved"
        DENIED = "3", "Denied"

    class ReadStatus(models.TextChoices):
        READ = "1", "Read"
        UNREAD = "2", "Unread"

    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, related_name="service_bookings", default=None
    )
    worker = models.ForeignKey(
        Worker, on_delete=models.CASCADE, related_name="worker_bookings", default=None
    )
    client = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="client_bookings", default=None
    )
    date_booking = models.DateField()
    time = models.CharField(max_length=30, default=None)
    status = models.CharField(default="1", choices=BookingStatus.choices, max_length=30)
    read = models.CharField(default="1", choices=ReadStatus.choices, max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date
